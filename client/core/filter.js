/* eslint-disable prettier/prettier */
import {
  lib
} from "./index";

export default {
  getStatusType(_val) {
    if (!_val) return _val;
    for (var item in lib.status) {

      if (lib.status[item].value == _val) {
        return lib.status[item].type
      };
    }
  },
  getStatusLabel(_val) {
    if (!_val) return _val;
    for (var item in lib.status) {
      if (lib.status[item].value == _val) return lib.status[item].label;
    }
  }
}