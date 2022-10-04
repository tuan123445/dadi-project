/* eslint-disable prettier/prettier */
import Api from "./Api";

export default {
  getById(value) {
    return Api().post("/api/users/getById", value).then((rs) => {
      return rs.data;
    });
  },
  createData(value) {
    return Api().post("/api/users/createData", value).then((rs) => {
      return rs.data;
    });
  },
  updateData(value) {
    return Api().post("/api/users/updateData", value).then((rs) => {
      return rs.data;
    });
  }
};