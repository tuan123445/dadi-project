/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const helper = require("../helper");
const db = require("../db");
const config = require("../config");
const router = express.Router();

router.post("/getAll", (req, res) => {
  let body = req.body;
  let query = `
    SELECT pj.*, 
    user_info_leader.user_name as leader_name, 
    user_info_created_person.user_name as created_person_name, 
    GROUP_CONCAT(memberlist.user_name) as member_list
    FROM projects_information as pj
      INNER JOIN users_information as user_info_leader
        ON user_info_leader.user_id = pj.leader_id
      INNER JOIN users_information as user_info_created_person
        ON user_info_created_person.user_id = pj.created_person_id
      LEFT JOIN(
        SELECT u.user_id, u.user_name, pm.project_id 
          FROM projects_member as pm 
            JOIN users_information as u
              ON u.user_id = pm.user_id
      ) as memberlist
        ON pj.project_id = memberlist.project_id
    GROUP BY pj.project_id;
  `;

  db.sequelize.query(query, db.helper.getQueryOptions(body)).then(rs => {
    console.log(rs);
    rs = rs.filter(f => f.project_id != null);
    return helper.response.json(res, rs);

  }).catch(err => {
    return helper.response.error(res, err);
  })
});

router.post("/getItemById", (req, res) => {
  let body = req.body;

  let query = `
    SELECT * , 
    user_info_leader.user_name as leader_name, 
    user_info_created_person.user_name as created_person_name
    FROM projects_information
    INNER JOIN users_information as user_info_leader
      ON user_info_leader.user_id = projects_information.leader_id
    INNER JOIN users_information as user_info_created_person
      ON user_info_created_person.user_id = projects_information.created_person_id
    WHERE project_id = :project_id
  `;

  db.sequelize.query(query, db.helper.getQueryOptions(body)).then(rs => {

    let getMemberListQuery = `
      SELECT pm.user_id, u.user_name
      FROM projects_information as pj
      INNER JOIN projects_member as pm
      ON pj.project_id = pm.project_id
      INNER JOIN users_information as u
      ON u.user_id = pm.user_id
      WHERE pj.project_id = :project_id
    `;

    db.sequelize.query(getMemberListQuery, db.helper.getQueryOptions(body)).then(memberListResult => {
      var memberIdList = [];
      var memberNameList = [];

      memberListResult.forEach(member => {
        memberIdList.push(member.user_id);
        memberNameList.push(member.user_name);
      });
      rs[0].member_id_list = memberIdList;
      rs[0].member_name_list = memberNameList;
      return helper.response.json(res, rs);
    });
  }).catch(err => {
    return helper.response.error(res, err);
  });
});

router.post("/getUserList", (req, res) => {
  let body = req.body;

  let query = `
    SELECT user_id, user_name as value
    FROM users_information
  `;

  db.sequelize.query(query, db.helper.getQueryOptions(body)).then(rs => {
    return helper.response.json(res, rs);
  }).catch(err => {
    return helper.response.error(res, err);
  });
});

router.post("/createData", (req, res) => {
  let body = req.body;
  return db.sequelize.transaction((tx) => {
    return new Promise(rex => rex()).then(() => {
      let setProjectId = body.project_name + helper.makeid(6);
      let insertData = {
        project_id: setProjectId,
        project_name: body.project_name,
        category: body.category,
        project_detail: body.project_detail,
        leader_id: body.leader_id,
        created_person_id: body.created_person_id,
        project_link: body.project_link,
        status: 0
      }
      return db.helper.insert(db.table.projects_information, insertData, null, tx).then(async () => {
        if (body.member_id_list && body.member_id_list.length != 0) {
          for (let i = 0; i < body.member_id_list.length; i++) {
            let insertDataForProjectMember = {
              project_id: setProjectId,
              user_id: body.member_id_list[i]
            }
            await db.helper.insert(db.table.projects_member, insertDataForProjectMember, null, tx);
          }
        }
        return helper.response.created(res);
      }).catch(err => {
        return helper.response.error(res, err);
      });
    });
  })
});

router.post("/update", (req, res) => {
  let body = req.body;
  return db.sequelize.transaction((tx) => {
    return new Promise(rex => rex()).then(() => {
      const updateData = {
        project_name: body.project_name,
        category: body.category,
        project_detail: body.project_detail,
        leader_id: body.leader_id,
        created_person_id: body.created_person_id,
        project_link: body.project_link,
        status: body.status
      }

      const where = {
        project_id: body.project_id,
      };

      return db.helper.update(db.table.projects_information, updateData, where, tx).then(async () => {
        return db.helper.physicalDelete(db.table.projects_member, where, tx).then(async () => {
          if (body.member_id_list && body.member_id_list.length != 0) {
            for (let i = 0; i < body.member_id_list.length; i++) {
              let insertDataForProjectMember = {
                project_id: body.project_id,
                user_id: body.member_id_list[i]
              }
              await db.helper.insert(db.table.projects_member, insertDataForProjectMember, null, tx);
            }
          }
          return helper.response.updated(res);
        });
      }).catch(err => {
        return helper.response.error(res, err);
      });
    });
  });
});

router.post("/delete", (req, res) => {
  let body = req.body;

  const where = {
    project_id: body.project_id,
  };

  return db.sequelize.transaction((tx) => {
    return new Promise(rex => rex()).then(() => {
      return db.helper.physicalDelete(db.table.projects_information, where, tx).then(() => {
        return db.helper.physicalDelete(db.table.projects_member, where, tx).then(() => {
          return helper.response.updated(res);
        });
      });
    });
  });
});

router.post("/checkProjectDuplicate", (req, res) => {
  let body = req.body;

  let query = `
    SELECT *
    FROM projects_information
    WHERE project_name = :project_name
  `;

  db.sequelize.query(query, db.helper.getQueryOptions(body)).then(rs => {
    let exits = false;
    if (rs[0]) exits = true;
    return helper.response.json(res, exits);
  }).catch(err => {
    return helper.response.error(res, err);
  });
});


module.exports = router;