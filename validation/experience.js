const Validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = validateExperienceInputs = data => {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title is required.";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company is required.";
  }
  if (Validator.isEmpty(data.from)) {
    errors.fromdate = "From date is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
