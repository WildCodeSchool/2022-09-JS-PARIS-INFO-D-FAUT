import React from "react";
import "./Item.css";

export const Item = ({ src, alt }) => {
  return (
    <div>
      <img className="item" src={src} alt={alt} />
    </div>
  );
};
