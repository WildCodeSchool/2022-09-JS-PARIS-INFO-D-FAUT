import React from "react";
import "./Textarea.css";

export const Textarea = ({ className, onChange, forId, value, type }) => {
  return (
    <div className="textarea-container">
      <label className="input-text" htmlFor={forId}>
        Description de l'anomalie
      </label>
      <textarea
        className={className}
        onChange={onChange}
        id={forId}
        value={value}
        type={type}
        cols="35"
        rows="4"
      />
    </div>
  );
};
