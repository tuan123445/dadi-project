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
  }
};