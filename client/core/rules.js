/* eslint-disable prettier/prettier */

export default {
  required: {
    required: true,
    trigger: "change",
    message: "Required field."
  },
  requiredEmail: {
    type: 'email',
    message: 'Please input correct email address',
    trigger: "change",
  }
};