/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const helper = require("../helper");
const db = require("../db");

router.post("/getById", (req, res) => {
  let body = req.body;

  let query = `
    SELECT * FROM users_information
    WHERE user_id = :user_id
  `
  db.sequelize.query(query, db.helper.getQueryOptions(body)).then(rs => {
    return helper.response.json(res, rs);
  })
});

router.post("/createData", (req, res) => {
  let body = req.body;

});

router.post("/updateData", (req, res) => {
  let body = req.body;
  let user_information_update_data = {

  };

  return db.sequelize.transaction((tx) => {
    return new Promise(rex => rex()).then(() => {
      return db.helper.update(db.table.users_information)
    });
  });
});

module.exports = router;