import React from "react";
import "./Textarea.css";

export const Textarea = ({ className, forId }) => {
  return (
    <div className="textarea-container">
      <label className="input-text" htmlFor={forId}>
        Description de l'anomalie
      </label>
      <textarea className={className} id={forId} cols="35" rows="4" />
    </div>
  );
};
