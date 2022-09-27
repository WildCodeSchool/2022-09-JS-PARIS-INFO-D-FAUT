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
        <li>
          {/* <a href={description} target="_blank" rel="noreferrer">
            voir photo
          </a> */}
          Description :{description}
        </li>
        <li>
          {/* <img src={image} alt={imgAlt} /> */}
          <a href={image} target="_blank" rel="noreferrer">
            voir photo
          </a>
        </li>
        <li>
          Géolocalisation : {latitude} {longitude}
        </li>
      </ul>
    </div>
  );
};
