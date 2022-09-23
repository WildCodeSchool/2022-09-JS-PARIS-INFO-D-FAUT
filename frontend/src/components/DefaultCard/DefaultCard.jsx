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
        <li> Gare : {station} </li>
        <li> Numero tgv :{tgv} </li>
        <li> Numero ter : {ter} </li>
        <li> Numero de ligne : {track} </li>
        <li> Description :{description} </li>
        <li>
          <img src={image} alt={imgAlt} />
        </li>
        <li>
          Géolocalisation : {latitude} {longitude}
        </li>
      </ul>
    </div>
  );
};
