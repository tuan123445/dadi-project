/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const helper = require("../helper");
const db = require("../db");

router.post("/getAll", (req, res) => {
  let query = `
    SELECT * FROM shop
  `
  db.sequelize.query(query, db.helper.getQueryOptions()).then(rs => {
    return helper.response.json(res, rs);
  })
});

module.exports = router;