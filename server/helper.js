/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const config = require("./config");
const consts = require("./utils/const");

function helperResponseInit(_res, _msg) {
  return _res.json({
    code: consts.responseCode.success,
    message: _msg,
  });
}

let helper = {
  response: {
    created: function (_res) {
      return helperResponseInit(_res, "Create success");
    },
    updated: function (_res) {
      return helperResponseInit(_res, "Edit success");
    },
    submitted: function (_res) {
      return helperResponseInit(_res, "Submission completed");
    },
    physicalDeletedeleted: function (_res) {
      return helperResponseInit(_res, "Delete success");
    },
    json: function (_res, _data) {
      return _res.json(_data);
    },
    error: function (_res, _err) {
      return _res.json({
        code: consts.responseCode.error,
        message: _err.name == "AppError" ? _err.message : "An error has occurred",
      });
    },
  },
  token: {
    create(data) {
      return jwt.sign(data, config.tokenPrivateKey);
    },
    decode(data) {
      return jwt.verify(data, config.tokenPrivateKey, function (err, token) {
        if (err) throw new Error(err);
        return token;
      })
    }
  },
  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }
};

module.exports = helper;