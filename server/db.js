/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const Sequelize = require("sequelize");
const {
  AppError
} = require("./utils/appError");
const config = require("./config");

// Sequelize settings
const dbConfig = config.database["production"];
if (!dbConfig) console.log("Datablse not found.");

/**
 * Import models
 * @param {String} _tableName Table name
 */
const moduleImporter = function (_name) {
  return require("./models/" + _name)(sequelize, Sequelize.DataTypes);
};

// Start connection
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  dialect: "mysql",
  host: dbConfig.host,
  port: dbConfig.port,
  timezone: "+09:00",
  define: {
    timestamps: false,
  },
  // logging: function (_msg) {
  //   if (!config.serverLog.enableSqlLog) return;
  //   let requestId = global.requestId ? global.requestId : "";
  //   logger.sql(
  //     `${requestId} ${_msg}`.replace(/\n/g, "").replace(/\s\s+/g, " ")
  //   );
  // },
});

sequelize
  .authenticate({
    logging: false,
  })
  .catch((err) => {
    // logger.error("Unable to connect to sql database server...", {
    //   detail: err,
    // });
    console.log(err);
  });

const table = {
  users: "users",
  users_information: "users_information",
  projects_member: "projects_member",
  projects_information: "projects_information",
  form_per_week: "form_per_week",
  form_per_week_detail: "form_per_week_detail",
  form_sugar_per_week: "form_sugar_per_week",
  form_sugar_per_week_detail: "form_sugar_per_week_detail",
  shop: "shop"
};

// helper for database
const helper = {
  getQueryOptions: function (_replacements = null) {
    let options = {
      // This query is SELECT
      type: db.sequelize.QueryTypes.SELECT,
      // Get result only
      raw: true,
    };

    // → Named parameter ":キー名" has no value in the given object.
    if (_replacements) {
      if (typeof _replacements === "object") {
        Object.keys(_replacements).forEach((key) => {
          _replacements[key] = _replacements[key] ? _replacements[key] : "";
        });
      }
      if (Array.isArray(_replacements)) {
        _replacements = _replacements.map((m) => {
          return m ? m : "";
        });
      }
      options.replacements = _replacements;
    }

    return options;
  },
  /**
   * テーブルのデータを更新する
   * @param {String} _table テーブル名
   * @param {Object} _data 更新データ
   * @param {Object} _where 条件
   * @param {Object} _transaction トランザクション
   */
  update: function (_table, _data, _where, _transaction = null) {
    const tableQuery = function (tx) {
      // 更新データ
      _data.date_updated = new Date();
      // _data.updated_personal_number = global.userInfo.user_cd;

      // Fix bug insert TRUE or FALSE
      Object.keys(_data).forEach((key) => {
        if (_data[key] === true) _data[key] = 1;
        if (_data[key] === false) _data[key] = 0;
      });

      return db[_table]
        .update(_data, {
          where: _where,
          transaction: tx,
        })
        .then((updatedCount) => {
          if (updatedCount <= 0 && "updated_count" in _where) {
            throw new AppError("noDataWasUpdated");
          }
        });
    };

    if (_transaction) return tableQuery(_transaction);
    return db.sequelize.transaction((tx) => tableQuery(tx));
  },

  /**
   * テーブルのデータを登録する
   * @param {String} _table テーブル名
   * @param {Object} _data 登録データ
   * @param {Object} _where 条件
   * @param {Object} _transaction トランザクション
   * @param {Object} _forceUpdate 古いデータを削除する
   */
  insert: async function (
    _table,
    _data,
    _where = null,
    _transaction = null,
    _forceInsert = false
  ) {
    const tableQuery = function (tx) {
      return db[_table]
        .findOne({
          raw: true, // Get result only
          where: _where,
          transaction: tx,
        })
        .then((row) => {
          return new Promise((reslove, reject) => {
            if (!_where) return reslove();

            // Data not exists
            if (!row) return reslove();

            // Check force update data
            if (_forceInsert === false) throw new AppError("Data exits");

            // del_flg例があるの場合
            if ("del_flg" in row) {
              if (!row.del_flg) throw new AppError("Data exits");

              // Check delete flag is using
              if (row.del_flg === 0) throw new AppError("Data exits");

              // Update delete flag to off
              _data.del_flg = 0;
            }

            // Delete old data
            return db[_table]
              .destroy({
                where: _where,
                transaction: tx,
              })
              .then(() => {
                return reslove();
              });
          }).then(() => {
            _data.date_created = new Date();
            // _data.created_personal_number = global.userInfo.user_cd;
            _data.date_updated = new Date();
            // _data.updated_personal_number = global.userInfo.user_cd;

            // Fix bug insert TRUE or FALSE
            Object.keys(_data).forEach((key) => {
              // _data[key] = _data[key] === true ? 1 : 0;
              if (_data[key] === true) _data[key] = 1;
              if (_data[key] === false) _data[key] = 0;
            });

            return db[_table]
              .create(_data, {
                transaction: tx,
              })
              .then((r) => r.dataValues);
          });
        });
    };

    if (_transaction) return tableQuery(_transaction);
    return db.sequelize
      .transaction((tx) => tableQuery(tx))
      .catch((err) => {
        throw err;
      });
  },

  /**
   * 物理削除する
   * @param {*} _table
   * @param {*} _where
   * @param {*} _transaction
   */
  physicalDelete: function (_table, _where, _transaction = null) {
    const tableQuery = function (tx) {
      return db[_table].destroy({
        where: _where,
        transaction: tx,
      });
    };

    if (_transaction) return tableQuery(_transaction);
    return db.sequelize.transaction((tx) => tableQuery(tx));
  },

  /**
   * 論理削除する
   * @param {String} _table テーブル名
   * @param {Object} _where 条件
   * @param {Object} _transaction トランザクション
   */
  delete: function (_table, _where, _transaction = false) {
    const tableQuery = function (tx) {
      // 更新データ
      let _data = {
        deleted: 1,
        date_updated: new Date(),
        // updated_personal_number: global.userInfo.user_cd,
      };

      return db[_table].update(_data, {
        where: _where,
        transaction: tx,
      });
    };

    if (_transaction) return tableQuery(_transaction);
    return db.sequelize.transaction((tx) => tableQuery(tx));
  },
};

let db = {
  helper: helper,
  sequelize: sequelize,
  table: table,
};

for (let key in table) {
  db[table[key]] = moduleImporter(table[key]);
}

module.exports = db;