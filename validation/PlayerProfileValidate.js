const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function ValidatePlayerProfile(data) {
  const errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.dateofbirth = !isEmpty(data.dateofbirth) ? data.dateofbirth : "";
  data.age = !isEmpty(data.age) ? data.age : "";
  data.currentGroup = !isEmpty(data.currentGroup) ? data.currentGroup : "";
  data.unique_id = !isEmpty(data.unique_id) ? data.unique_id : "";
  data.contactNO = !isEmpty(data.contactNO) ? data.contactNO : "";
  data.mother = !isEmpty(data.mother) ? data.mother : "";
  data.father = !isEmpty(data.father) ? data.father : "";

  if (!Validator.isLength(data.name, { min: 3, max: 50 })) {
    errors.name = "Name must be between 3 to 50 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field must not be empty";
  }

  if (Validator.isEmpty(data.dateofbirth)) {
    errors.dateofbirth = "Date of Birth field must not be empty";
  }

  if (Validator.isEmpty(data.age)) {
    errors.age = "Age field must not be empty";
  }

  if (!Validator.isLength(data.currentGroup, { min: 3, max: 50 })) {
    errors.currentGroup = "Current Group name must be between 3 to 50 characters";
  }

  if (Validator.isEmpty(data.currentGroup)) {
    errors.currentGroup = "Current Group name field must not be empty";
  }

  if (Validator.isEmpty(data.unique_id)) {
    errors.unique_id = "Unique ID field must not be empty";
  }


  if (!Validator.isLength(data.contactNO, { min: 3, max: 50 })) {
    errors.contactNO = "Contact NO must be between 6 to 30 characters";
  }

  if (Validator.isEmpty(data.contactNO)) {
    errors.contactNO = "Contact NO field must not be empty";
  }

  if(data.mother)
  {
    if (Validator.isEmpty(data.mother)) {
      errors.mother = "Mother field must not be empty";
    }
  }

  if (Validator.isEmpty(data.father)) {
    errors.father = "Father field must not be empty";
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};