const Validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = validateEducationInputs = data => {
  let errors = {};
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "school name is required.";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Type of the degree is required.";
  }
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study is required.";
  }

  if (Validator.isEmpty(data.from)) {
    errors.fromdate = "From date is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
