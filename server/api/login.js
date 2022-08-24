/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const helper = require("../helper");
const db = require("../db");
const router = express.Router();

router.post("/auth", (req, res) => {
  var body = req.body;
  helper.response.json(res, body);
});

router.post("/signIn", (req, res) => {
  var body = req.body;
  helper.response.json(res, body);
})

module.exports = router;