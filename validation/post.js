const Validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = validatePostInputs = data => {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : "";

  if (Validator.isEmpty(data.text)) {
    errors.text = "Post content is required.";
  }
  if (!Validator.isLength(data.text, { min: 10, max: 600 })) {
    errors.text = "Post content must be between 10 and 600 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
