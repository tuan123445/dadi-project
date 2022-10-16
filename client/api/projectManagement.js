/* eslint-disable prettier/prettier */
import Api from "./Api";

export default {
  getAll(value) {
    return Api().post("/api/projectManagement/getAll", value).then((rs) => {
      return rs.data;
    });
  },
  getItemById(value) {
    return Api().post("/api/projectManagement/getItemById", value).then((rs) => {
      return rs.data;
    });
  },
  update(value) {
    return Api().post("/api/projectManagement/update", value).then((rs) => {
      return rs.data;
    });
  },
  delete(value) {
    return Api().post("/api/projectManagement/delete", value).then((rs) => {
      return rs.data;
    });
  },
  getUserList(value) {
    return Api().post("/api/projectManagement/getUserList", value).then((rs) => {
      return rs.data;
    });
  }
};