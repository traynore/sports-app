const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function ValidateCoachesProfile(data) {
  const errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.childSafeGaurding = !isEmpty(data.childSafeGaurding) ? data.childSafeGaurding : "";
  data.unique_id = !isEmpty(data.unique_id) ? data.unique_id : "";
  data.contactNO = !isEmpty(data.contactNO) ? data.contactNO : "";

  if (!Validator.isLength(data.name, { min: 3, max: 50 })) {
    errors.name = "Name must be between 3 to 50 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field must not be empty";
  }

  if (Validator.isEmpty(data.unique_id)) {
    errors.unique_id = "Unique ID field must not be empty";
  }

  if (Validator.isEmpty(data.childSafeGaurding)) {
    errors.childSafeGaurding = "Child Safe Guarding field must not be empty";
  }

  if (!Validator.isLength(data.contactNO, { min: 3, max: 50 })) {
    errors.contactNO = "Contact NO must be between 6 to 30 characters";
  }

  if (Validator.isEmpty(data.contactNO)) {
    errors.contactNO = "Contact NO field must not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};