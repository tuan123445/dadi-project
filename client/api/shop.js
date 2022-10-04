/* eslint-disable prettier/prettier */
import Api from "./Api";

export default {
  getAll(value) {
    return Api().post("/api/shop/getAll", value).then((rs) => {
      return rs.data;
    });
  },
};