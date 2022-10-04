/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();

router.use("/calendar", require("./calendar"));
router.use("/login", require("./login"));
router.use("/shop", require("./shop"));
router.use("/users", require("./users"));
module.exports = router;