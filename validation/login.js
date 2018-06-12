const Validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = validateLoginInputs = data => {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

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

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
