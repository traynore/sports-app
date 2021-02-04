const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function ValidateCurrentGroup(data) {
  const errors = {};
  data.curgroup = !isEmpty(data.curgroup) ? data.curgroup : "";

  if (!Validator.isLength(data.curgroup, { min: 3})) {
    errors.curgroup = "Current Group must be greater than 3 characters";
  }

  if (Validator.isEmpty(data.curgroup)) {
    errors.curgroup = "Current Group field must not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};