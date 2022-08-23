/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();

router.use("/calendar", require("./calendar"));

module.exports = router;