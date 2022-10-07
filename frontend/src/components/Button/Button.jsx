import React from "react";
import "./Button.css";

export const Button = ({
  name,
  label,
  classButton,
  fieldButton,
  type,
  disabled,
  onClick,
}) => {
  return (
    <div className="button-container">
      <label className="label-text" id={name} htmlFor={name}>
        {label}
      </label>
      <button
        className={classButton}
        disabled={disabled}
        id={name}
        onClick={onClick}
        type={type}
      >
        {fieldButton}
      </button>
    </div>
  );
};
