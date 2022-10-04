var DataTypes = require("sequelize").DataTypes;
var _form_per_week = require("./form_per_week");
var _form_per_week_detail = require("./form_per_week_detail");
var _form_per_week_projects = require("./form_per_week_projects");
var _form_sugar_per_week = require("./form_sugar_per_week");
var _form_sugar_per_week_detail = require("./form_sugar_per_week_detail");
var _projects_information = require("./projects_information");
var _projects_member = require("./projects_member");
var _shop = require("./shop");
var _users = require("./users");
var _users_information = require("./users_information");

function initModels(sequelize) {
  var form_per_week = _form_per_week(sequelize, DataTypes);
  var form_per_week_detail = _form_per_week_detail(sequelize, DataTypes);
  var form_per_week_projects = _form_per_week_projects(sequelize, DataTypes);
  var form_sugar_per_week = _form_sugar_per_week(sequelize, DataTypes);
  var form_sugar_per_week_detail = _form_sugar_per_week_detail(sequelize, DataTypes);
  var projects_information = _projects_information(sequelize, DataTypes);
  var projects_member = _projects_member(sequelize, DataTypes);
  var shop = _shop(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var users_information = _users_information(sequelize, DataTypes);


  return {
    form_per_week,
    form_per_week_detail,
    form_per_week_projects,
    form_sugar_per_week,
    form_sugar_per_week_detail,
    projects_information,
    projects_member,
    shop,
    users,
    users_information,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
