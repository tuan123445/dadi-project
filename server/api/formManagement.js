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
    console.log(body);

    return helper.response.json(res, body);
});

module.exports = router;