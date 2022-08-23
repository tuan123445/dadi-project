/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-undef
module.exports = {
  appMode: {
    development: "development",
    production: "production",
    staging: "staging",
    test: "test",
  },

  dbFlg: {
    on: 1,
    off: 0,
  },

  dateTimeFormat: {
    default: "YYYY/MM/DD HH:mm",
    date: "YYYY/MM/DD",
    time: "HH:mm:ss",
    dateTime: "YYYY/MM/DD HH:mm:ss",
    datePicker: {
      date: "yyyy/MM/DD",
    },
  },

  storageKey: {
    lang: "lang",
    token: "token",
  },
  responseCode: {
    success: 801,
    error: 802,
    noPermission: 803,
    maintenance: 804,
  },

  log: {
    level: {
      error: 1,
      warn: 2,
      info: 3,
      verbose: 4,
      debug: 5,
      silly: 6,
    },
    type: {
      all: "all",
      system: "system",
      http: "http",
      sql: "sql",
      auth: "auth",
    },
  },
};