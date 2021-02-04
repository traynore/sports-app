const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function ValidatePlayerMedicalNote(data) {
  const errors = {};
  data.playerMedicalNote = !isEmpty(data.playerMedicalNote) ? data.playerMedicalNote : "";

  if (!Validator.isLength(data.playerMedicalNote, { min: 3})) {
    errors.playerMedicalNote = "Player Medical Note must be greater than 3 characters";
  }

  if (Validator.isEmpty(data.playerMedicalNote)) {
    errors.playerMedicalNote = "Player Medical Note must not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};