import React from "react";
import "./Input.css";

export const Input = ({
  type,
  champ,
  forId,
  onChange,
  defaultValue,
  value,
  onClick,
  placeholder,
  minlength,
  maxlength,
}) => {
  return (
    <div className="input-container">
      <label className="label-text" htmlFor={forId}>
        {champ}
      </label>
      <input
        className="input-text"
        type={type}
        id={forId}
        name={champ}
        onChange={onChange}
        defaultValue={defaultValue}
        value={value}
        onClick={onClick}
        placeholder={placeholder}
        minLength={minlength}
        maxLength={maxlength}
      />
    </div>
  );
};
