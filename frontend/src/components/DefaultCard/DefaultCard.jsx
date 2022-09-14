import React from "react";
import "./DefaultCard.css";

export const DefaultCard = ({
  station,
  tgv,
  ter,
  track,
  description,
  image,
  imgAlt,
  latitude,
  longitude,
}) => {
  return (
    <div className="defaultCard-container">
      <ul>
        <li> {station} </li>
        <li> {tgv} </li>
        <li> {ter} </li>
        <li> {track} </li>
        <li> {description} </li>
        <li>
          <img src={image} alt={imgAlt} />
        </li>
        <li>
          {latitude} {longitude}
        </li>
      </ul>
    </div>
  );
};
