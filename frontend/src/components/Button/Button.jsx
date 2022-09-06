import React from 'react';
import "./Button.css";

export const Button = ({
    name,
    label,
    classButton,
    champButton,
    type,
    onClick,
  }) => {
    return (
      <div className="button-container">
        <label className="label-text" id={name} htmlFor={name}>
          {label}
        </label>
        <button className={classButton} id={name} onClick={onClick} type={type}>
          {champButton}
        </button>
      </div>
    );
  };