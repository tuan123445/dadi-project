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
      INNER JOIN(
        SELECT u.user_id, u.user_name, pm.project_id 
          FROM projects_member as pm 
            JOIN users_information as u
              ON u.user_id = pm.user_id
      ) as memberlist
        ON pj.project_id = memberlist.project_id
    GROUP BY pj.project_id;
  `;

  db.sequelize.query(query, db.helper.getQueryOptions(body)).then(rs => {
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
    WHERE user_name != ""
  `;

  db.sequelize.query(query, db.helper.getQueryOptions(body)).then(rs => {
    return helper.response.json(res, rs);
  }).catch(err => {
    return helper.response.error(res, err);
  });
})



module.exports = router;