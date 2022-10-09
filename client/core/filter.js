/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import {
  lib
} from "./index";
import moment from "moment";

export default {
  getStatusType(_val) {
    if (_val != "" && _val != undefined) return _val;
    for (var item in lib.status) {
      if (lib.status[item].value == _val) {
        return lib.status[item].type
      };
    }
  },
  getStatusLabel(_val) {
    if (_val != "" && _val != undefined) return _val;
    for (var item in lib.status) {
      if (lib.status[item].value == _val) return lib.status[item].label;
    }
  },
  dateConvert(_val) {
    if (!_val) return _val;
    return moment(_val).format("MM-DD-YYYY");
  }
}