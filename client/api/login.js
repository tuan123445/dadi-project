/* eslint-disable prettier/prettier */
import Api from "./Api";
export default {
  auth(value) {
    return Api().post("/api/login/auth", value).then((rs) => {
      return rs.data;
    });
  },
  signIn(value) {
    return Api().post("/api/login/signIn", value).then((rs) => {
      return rs.data;
    });
  },
  checkDuplicate(value) {
    return Api().post("/api/login/checkDuplicate", value).then((rs) => {
      return rs.data;
    });
  },
  checkRouter(value) {
    return Api().post("/api/login/checkRouter", value).then((rs) => {
      return rs.data;
    });
  },
  logOut(value) {
    return Api().post("/api/login/logOut", value).then((rs) => {
      return rs.data;
    });
  }
};