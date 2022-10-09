/* eslint-disable prettier/prettier */
import Api from "./Api";

export default {
  getAll(value) {
    return Api().post("/api/projectSubmit/getAll", value).then((rs) => {
      return rs.data;
    });
  },
  getItemById(value) {
    return Api().post("/api/projectSubmit/getItemById", value).then((rs) => {
      return rs.data;
    });
  },
  getUserList(value) {
    return Api().post("/api/projectSubmit/getUserList", value).then((rs) => {
      return rs.data;
    });
  },
  createData(value) {
    return Api().post("/api/projectSubmit/createData", value).then((rs) => {
      return rs.data;
    });
  },
  update(value) {
    return Api().post("/api/projectSubmit/update", value).then((rs) => {
      return rs.data;
    });
  },
  delete(value) {
    return Api().post("/api/projectSubmit/delete", value).then((rs) => {
      return rs.data;
    });
  },
  checkProjectDuplicate(value) {
    return Api().post("/api/projectSubmit/checkProjectDuplicate", value).then((rs) => {
      return rs.data;
    });
  }
};