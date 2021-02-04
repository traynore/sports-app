const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function ValidatePlayerNote(data) {
  const errors = {};
  data.playerNote = !isEmpty(data.playerNote) ? data.playerNote : "";

  if (!Validator.isLength(data.playerNote, { min: 3})) {
    errors.playerNote = "Player Note must be greater than 3 characters";
  }

  if (Validator.isEmpty(data.playerNote)) {
    errors.playerNote = "Player Note field must not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};