/* eslint-disable prettier/prettier */
import Api from "./Api";

export default {
  getAll(value) {
    return Api().post("/api/formSubmit/getAll", value).then((rs) => {
      return rs.data;
    });
  },
  getItemById(value) {
    return Api().post("/api/formSubmit/getItemById", value).then((rs) => {
      return rs.data;
    });
  },
  createData(value) {
    return Api().post("/api/formSubmit/createData", value).then((rs) => {
      return rs.data;
    });
  },
  update(value) {
    return Api().post("/api/formSubmit/update", value).then((rs) => {
      return rs.data;
    });
  },
  delete(value) {
    return Api().post("/api/formSubmit/delete", value).then((rs) => {
      return rs.data;
    });
  },
  addSugar(value) {
    return Api().post("/api/formSubmit/addSugar", value).then((rs) => {
      return rs.data;
    });
  },
  checkFormExist(value) {
    return Api().post("/api/formSubmit/checkFormExist", value).then((rs) => {
      return rs.data;
    });
  },
  getProjectList(value) {
    return Api().post("/api/formSubmit/getProjectList", value).then((rs) => {
      return rs.data;
    });
  },
};