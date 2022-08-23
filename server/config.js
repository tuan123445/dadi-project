/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const path = require("path");
const req = require("require-yml");

module.exports = {
  ...req(path.join(__dirname, "./config.yaml")),
};