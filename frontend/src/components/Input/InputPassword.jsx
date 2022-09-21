import React, { useState } from "react";
import "./InputPassword.css";
import closereye from "../../assets/eye-closer.svg";
import openeye from "../../assets/eye-open.svg";

export const InputPassword = ({
  champ,
  forId,
  onChange,
  defaultValue,
  value,
  onClick,
  placeholder,
  minlength,
  maxlength,
  className,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const click = () => setPasswordVisible((prevState) => !prevState);
  return (
    <div className="inputPassword-container">
      <label className="label-text" htmlFor={forId}>
        {champ}
      </label>
      <label className="enterPassword">
        <input
          className="inputPassword"
          type={passwordVisible ? "text" : "password"}
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
        <span onClick={click} onKeyPress={click} role="button" tabIndex="0">
          <img
            className="eye"
            src={passwordVisible ? closereye : openeye}
            alt=""
          />
        </span>
      </label>
    </div>
  );
};
