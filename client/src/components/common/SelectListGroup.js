import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  options
}) => {
  const selectOptions = options.map(option => {
    return (
      <option key={option.lable} value={option.value}>
        {option.lable}
      </option>
    );
  });
  return (
    <div className="form-group">
      <select
        className={classNames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
