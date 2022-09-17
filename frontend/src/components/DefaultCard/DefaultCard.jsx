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
        <li> gare : {station} </li>
        <li> numero tgv :{tgv} </li>
        <li> numero tgv : {ter} </li>
        <li> numero de ligne : {track} </li>
        <li> description :{description} </li>
        <li>
          <img src={image} alt={imgAlt} />
        </li>
        <li>
          géolocalisation : {latitude} {longitude}
        </li>
      </ul>
    </div>
  );
};
