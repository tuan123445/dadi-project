/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const helper = require("../helper");
const db = require("../db");
const config = require("../config");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/checkRouter", (req, res) => {
  return jwt.verify(req.cookies["token"], config.tokenPrivateKey, function (err, userInfo) {
    if (err) {
      if (req.cookies["token"]) {
        res.clearCookie("token");
      }
      return helper.response.json(res, {
        status: false,
      });
    }

    return helper.response.json(res, {
      status: true
    });
  })
});

router.post("/auth", (req, res) => {
  let body = req.body;

  let query = `
    SELECT * from users
    WHERE user_email = :email
  `;

  db.sequelize.query(query, db.helper.getQueryOptions(body)).then(rs => {
    if (!rs[0]) {
      return helper.response.json(res, {
        status: false,
        mes: "Email don't exist"
      });
    }

    let password = helper.token.decode(rs[0].password);
    if (password === body.password) {

      let user = rs[0];
      delete user.password;

      let token = jwt.sign(user, config.tokenPrivateKey);
      let cookieSetting = {
        httpOnly: false, // to disable accessing cookie via client side js
        secure: false, // to force https (if you use it)
        sameSite: true,
      };
      res.cookie("token", token, cookieSetting);
      return helper.response.json(res, {
        status: true,
      });
    }

    return helper.response.json(res, {
      status: false,
      mes: "Password is wrong"
    })
  });
});

router.post("/signIn", (req, res) => {
  let body = req.body;

  let token = helper.token.create(body.password);
  let insertData = {
    user_email: body.email,
    password: token,
    user_permision: 0
  }

  db.helper.insert(db.table.users, insertData).then(rs => {
    return helper.response.created(res);
  }).catch((err) => {
    return helper.response.error(res, err);
  });
});

router.post("/checkDuplicate", (req, res) => {
  let body = req.body;
  let query = `
    SELECT user_email from users where user_email = :email
  `;

  db.sequelize.query(query, db.helper.getQueryOptions(body)).then(rs => {
    if (rs[0]) return helper.response.json(res, true);
    return helper.response.json(res, false);
  });
});

module.exports = router;