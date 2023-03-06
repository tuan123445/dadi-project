/* eslint-disable prettier/prettier */
import Api from "./Api";

export default {
  getAll(value) {
    return Api().post("/api/formManagement/getAll", value).then((rs) => {
      return rs.data;
    });
  },
  getItemById(value) {
    return Api().post("/api/formManagement/getItemById", value).then((rs) => {
      return rs.data;
    });
  },
  createData(value) {
    return Api().post("/api/formManagement/createData", value).then((rs) => {
      return rs.data;
    });
  },
  update(value) {
    return Api().post("/api/formManagement/update", value).then((rs) => {
      return rs.data;
    });
  },
  delete(value) {
    return Api().post("/api/formManagement/delete", value).then((rs) => {
      return rs.data;
    });
  },
  addSugar(value) {
    return Api().post("/api/formManagement/addSugar", value).then((rs) => {
      return rs.data;
    });
  },
  checkFormExist(value) {
    return Api().post("/api/formManagement/checkFormExist", value).then((rs) => {
      return rs.data;
    });
  },
  getProjectList(value) {
    return Api().post("/api/formManagement/getProjectList", value).then((rs) => {
      return rs.data;
    });
  },
};