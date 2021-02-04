const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function ValidateCurrentGroup(data) {
  const errors = {};
  data.category = !isEmpty(data.category) ? data.category : "";
  data.award = !isEmpty(data.award) ? data.award : "";

  if (!Validator.isLength(data.category, { min: 3})) {
    errors.category = "Category must be greater than 3 characters";
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = "Category field must not be empty";
  }

  if (Validator.isEmpty(data.award)) {
    errors.award = "Award field must not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};