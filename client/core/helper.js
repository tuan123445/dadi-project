/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  ElMessageBox as euiMessageBox
} from "element-plus";
import {
  lib
} from "./index";
let helper = {};

const popupInit = (mes, title = null, type = null) => {
  return new Promise((res) => {
    let options = {
      confirmButtonText: lib.button.accept,
      showClose: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      callback: action => res(action)
    }

    if (type) options.type = type;
    euiMessageBox.alert(mes, title, options);
  })
};

helper.popup = {
  alert: (mes, title = null) => {
    return popupInit(mes, title);
  },
  success: (mes, title = null) => {
    return popupInit(mes, title, lib.popupType.success)
  },
  warning: (mes, title = null) => {
    return popupInit(mes, title, lib.popupType.warning)
  },
  info: (mes, title = null) => {
    return popupInit(mes, title, lib.popupType.info)
  },
  error: (mes, title = null) => {
    return popupInit(mes, title, lib.popupType.error)
  },
  confirm: (mes, title = null) => {
    if (title === null) title = lib.popupType.confirm;
    return new Promise((res) => {
      return euiMessageBox.confirm(mes, title, {
        confirmButtonText: lib.button.accept,
        cancelButtonText: lib.button.cancel,
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: "warning"
      }).then(() => {
        return res(true);
      }).catch(() => {
        return res(false);
      });
    });
  }
}

import {
  ElMessage as euiMessage
} from "element-plus";

const toastInit = (mes, type) => {
  return euiMessage({
    showClose: true,
    message: mes,
    type: type
  });
}

helper.toast = {
  success: (mes) => {
    return toastInit(mes, "success");
  },
  warning: (mes) => {
    return toastInit(mes, "warning");
  },
  info: (mes) => {
    return toastInit(mes, "info");
  },
  error: (mes) => {
    return toastInit(mes, "error");
  },
}


helper.validateForm = function (ref, confirm = false) {
  return new Promise((rex, rej) => {

    if (!ref && confirm) {
      return this.popup.confirm(confirm).then(result => {
        if (result) rex(true);
      })
    }

    ref.validate((valid) => {
      if (!valid) return this.popup.error("Please input required input!", lib.popupType.error)
      if (!valid) return;
      if (confirm === false) return rex(true);

      this.popup.confirm(confirm).then(result => {
        if (result) rex(true);
      })
    });
  });

};

helper.clearData = function (data = []) {
  if (data.length <= 0) return;
  let temp = {};
  Object.keys(data).forEach((key) => {
    temp[key] = undefined;
  });
  return temp;
};


export default helper;