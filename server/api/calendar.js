/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const helper = require("../helper");
const db = require("../db");
const router = express.Router();

router.post("/getData", (req, res) => {
  let data = req.body;
  let query = `
    SELECT * FROM users
  `;
  return db.sequelize.query(query, db.helper.getQueryOptions()).then(rs => {
    return helper.response.json(res, rs);
  });
});

module.exports = router;