const Validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = validateProfileInputs = data => {
  let errors = {};
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is require.";
  }
  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Profile handle needs to be between 2 and 40 characters.";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required.";
  }
  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills are required.";
  }

  if (!isEmpty(data.website)) {
    // const options = {
    //   protocols: ["http", "https"],
    //   require_protocol: true
    // };
    if (!Validator.isURL(data.website)) {
      errors.website = "URL needs to starts with http or https";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
