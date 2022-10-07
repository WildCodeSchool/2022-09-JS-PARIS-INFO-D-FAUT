import React from "react";
import "./Input.css";

export const Input = ({
  type,
  field,
  labelCss,
  forId,
  onChange,
  defaultValue,
  value,
  onClick,
  placeholder,
  minlength,
  maxlength,
  className,
  autoComplete,
  accept,
  capture,
}) => {
  return (
    <div className="input-container">
      <label className={`label-text ${labelCss}`} htmlFor={forId}>
        {field}
      </label>
      <input
        className={className}
        type={type}
        id={forId}
        name={field}
        onChange={onChange}
        defaultValue={defaultValue}
        value={value}
        onClick={onClick}
        placeholder={placeholder}
        minLength={minlength}
        maxLength={maxlength}
        autoComplete={autoComplete}
        accept={accept}
        capture={capture}
      />
    </div>
  );
};
