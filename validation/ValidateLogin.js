const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function ValidateLogin(data) {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field must not be empty";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least six characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field must not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};