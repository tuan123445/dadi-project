/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
class AppError extends Error {
  constructor(message) {
    super(message);
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;