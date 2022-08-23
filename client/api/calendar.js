/* eslint-disable prettier/prettier */
import Api from "./Api";
export default {
  getData(value) {
    return Api().post("/api/calendar/getData", value).then((rs) => {
      return rs.data;
    });
  },
};