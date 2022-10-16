/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const helper = require("../helper");
const db = require("../db");
const config = require("../config");
const router = express.Router();
const moment = require("moment");
const {
  response
} = require("../helper");

router.post("/getAll", (req, res) => {
  let body = req.body;
  let query = `
  SELECT form_detail.*, form.year, form.month, form.week, form.sugar_received, form_lk_note.lk_note, user.user_name,
    GROUP_CONCAT(project_list.project_name) as project_list,
    GROUP_CONCAT(project_list.project_link) as project_link_list
  FROM form_per_week as form
  LEFT JOIN form_per_week_detail as form_detail
  ON form.form_id = form_detail.form_id
  LEFT JOIN form_per_week_lk_note as form_lk_note
  ON form.form_id = form_lk_note.form_id
  LEFT JOIN users_information as user
  ON form.user_id = user.user_id
  LEFT JOIN(
    SELECT f.form_id, f.project_id, p.project_name, p.project_link FROM form_per_week_projects as f LEFT JOIN projects_information as p ON f.project_id = p.project_id
  ) as project_list
  ON project_list.form_id = form.form_id
  `
  query += `WHERE `

  if (body.week) {
    query += `
        form.week = :week AND 
     `
  }

  if (body.month) {
    query += `
        form.month = :month AND
     `
  }

  if (body.year) {
    query += `
        form.year = :year AND
     `
  }

  if (body.user_name) {
    query += `
        user.user_name = :user_name AND
     `
  }

  query += `"" = ""`


  query += `
    GROUP BY form.form_id
  `;
  db.sequelize.query(query, db.helper.getQueryOptions(body)).then(rs => {
    if (rs) {
      rs = rs.map(item => {
        if (item.year && item.month && item.week) {
          item.week_date = "week " + item.week + " of " + item.year + "-" + item.month;
          return item;
        }
      });
    }
    return helper.response.json(res, rs);
  });
});

router.post("/getItemById", (req, res) => {
  let body = req.body;
  let query = `
    SELECT form_detail.*, form.year, form.month, form.week, form.sugar_received, form_lk_note.lk_note, user.user_name
    FROM form_per_week as form
    LEFT JOIN form_per_week_detail as form_detail
      ON form.form_id = form_detail.form_id
    LEFT JOIN form_per_week_lk_note as form_lk_note
      ON form.form_id = form_lk_note.form_id
    LEFT JOIN users_information as user
      ON form.user_id = user.user_id
    WHERE form.form_id = :form_id
  `;

  db.sequelize.query(query, db.helper.getQueryOptions(body)).then(rs => {

    // get project list
    let getProjectListQuery = `
      SELECT project_id 
      FROM form_per_week_projects
      WHERE form_id = :form_id;
    `;

    db.sequelize.query(getProjectListQuery, db.helper.getQueryOptions(body)).then(projectList => {
      let resultList = [];

      projectList.forEach(projectItem => {
        resultList.push(projectItem.project_id);
      });
      rs[0].projectList = resultList;
      rs[0].monthYear = new Date(rs[0].year.toString() + "-" + rs[0].month.toString());
      return helper.response.json(res, rs);
    });

  }).catch(err => {
    return helper.response.error(res, err);
  });
});

router.post("/createData", async (req, res) => {
  let body = req.body;
  let month = moment(new Date(body.monthYear)).month() + 1;
  let year = moment(new Date(body.monthYear)).year();

  body.user_id = "4syO6";
  return db.sequelize.transaction((tx) => {
    return new Promise(rex => rex()).then(() => {

      let formPerWeekData = {
        user_id: body.user_id,
        form_id: body.user_id + year + month + body.week,
        week: body.week,
        month: month,
        year: year,
      };

      return db.helper.insert(db.table.form_per_week, formPerWeekData, null, tx).then(() => {

        let formPerWeekDetailData = {
          form_id: body.user_id + year + month + body.week,
          doodiness_work: body.doodiness_work,
          friendship_sugar: body.friendship_sugar,
          missionary_sugar: body.missionary_sugar,
          partner: body.partner,
          note_for_lk: body.note_for_lk,
          dadi_event_rsvp: body.dadi_event_rsvp,
          status: 0
        };

        return db.helper.insert(db.table.form_per_week_detail, formPerWeekDetailData, null, tx).then(async () => {
          if (body.projectList && body.projectList.length > 0) {
            for (let i = 0; i < body.projectList.length; i++) {
              let forPerWeekProject = {
                form_id: body.user_id + body.year + body.month + body.week,
                project_id: body.projectList[i]
              }

              await db.helper.insert(db.table.form_per_week_projects, forPerWeekProject, null, tx);
            }
          }
          return helper.response.created(res);
        })
      }).catch(err => {
        return helper.response.error(res, err);
      });
    })
  });
});

router.post("/update", (req, res) => {
  let body = req.body;
  let month = moment(new Date(body.monthYear)).month() + 1;
  let year = moment(new Date(body.monthYear)).year();

  return db.sequelize.transaction((tx) => {
    return new Promise(rex => rex()).then(() => {
      const updateFormPerWeekData = {
        week: body.week,
        month: month,
        year: year,
      };

      const where = {
        form_id: body.form_id,
      };

      return db.helper.update(db.table.form_per_week, updateFormPerWeekData, where, tx).then(() => {
        const updateFormPerWeekDetailData = {
          doodiness_work: body.doodiness_work,
          friendship_sugar: body.friendship_sugar,
          missionary_sugar: body.missionary_sugar,
          partner: body.partner,
          note_for_lk: body.note_for_lk,
          dadi_event_rsvp: body.dadi_event_rsvp,
          status: body.status
        };

        return db.helper.update(db.table.form_per_week_detail, updateFormPerWeekDetailData, where, tx).then(async () => {
          return db.helper.physicalDelete(db.table.form_per_week_projects, where, tx).then(async () => {
            if (body.projectList && body.projectList.length > 0) {
              for (let i = 0; i < body.projectList.length; i++) {
                let forPerWeekProject = {
                  form_id: body.form_id,
                  project_id: body.projectList[i]
                }

                await db.helper.insert(db.table.form_per_week_projects, forPerWeekProject, null, tx);
              }
            }
            return helper.response.updated(res);
          });
        });
      }).catch(err => {
        return helper.response.error(res, err);
      });
    });
  });
});

router.post("/delete", (req, res) => {
  let body = req.body;
  return db.sequelize.transaction((tx) => {
    return new Promise(rex => rex()).then(() => {
      let where = {
        form_id: body.form_id
      }
      return db.helper.physicalDelete(db.table.form_per_week, where, tx).then(() => {
        return db.helper.physicalDelete(db.table.form_per_week_detail, where, tx).then(() => {
          return db.helper.physicalDelete(db.table.form_per_week_projects, where, tx).then(() => {
            return db.helper.physicalDelete(db.table.form_per_week_lk_note, where, tx).then(() => {
              return helper.response.updated(res);
            })
          })
        });
      });
    });
  }).catch(err => {
    return helper.response.error(res, err);
  });
});

router.post("/checkFormExist", (req, res) => {
  let body = req.body;
  body.user_id = "4syO6";

  let month = moment(new Date(body.monthYear)).month() + 1;
  let year = moment(new Date(body.monthYear)).year();

  let query = `
    SELECT *
    FROM form_per_week
    WHERE user_id = :user_id
    AND year = :year
    AND month = :month
    AND week = :week
  `

  db.sequelize.query(query, db.helper.getQueryOptions({
    user_id: body.user_id,
    year: year,
    month: month,
    week: body.week
  })).then(rs => {
    let result = false;
    if (rs[0]) {
      result = true;
    }

    return helper.response.json(res, result);
  }).catch(err => {
    helper.response.error(res, err);
  });
});

router.post("/addSugar", (req, res) => {
  let body = req.body;

  let insertData = {
    sugar_received: body.sugar_received
  };

  let where = {
    form_id: body.form_id
  };

  return db.helper.update(db.table.form_per_week, insertData, where, null).then(() => {
    return helper.response.updated(res);
  }).catch(err => {
    return helper.response.error(res, err);
  });
});

router.post("/getProjectList", (req, res) => {
  let body = req.body;
  let query = `
    SELECT project_id, project_name
    FROM projects_information;
  `;

  db.sequelize.query(query, db.helper.getQueryOptions(body)).then(rs => {
    return helper.response.json(res, rs);
  }).catch(err => {
    return helper.response.error(res, err)
  });
});

module.exports = router;