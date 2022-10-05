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
  traitement,
  etatContainer,
  cp,
}) => {
  const etat = (etatCss) => {
    if (etatCss === "traité") {
      return "traité-container ";
    }
    if (etatCss === "En cours de traitement") {
      return "encours-container ";
    }
    return "nontraité-container";
  };

  return (
    <div className={etat(etatContainer)}>
      <ul>
        <li>CP : {cp} </li>
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
        <li>Traitement : {traitement}</li>
      </ul>
    </div>
  );
};
