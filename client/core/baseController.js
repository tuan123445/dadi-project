/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import helper from "./helper";
import Api from "../api/index";

export default {
  data() {
    return {
      modal: {
        editMode: false,
        show: false,
        formData: {},
        formName: "modalForm",
      },
    };
  },
};