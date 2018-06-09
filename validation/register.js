const Validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = validateRegisterInputs = data => {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be beteen 2 and 30 characters.";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required.";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required.";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not valid.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters. ";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirmed password is required.";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password = "Password & Confirmed password do not match.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
