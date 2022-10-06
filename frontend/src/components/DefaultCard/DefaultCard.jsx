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
      <ul className="ul-default-card">
        <li>CP : {cp} </li>
        <li
          className={
            station === null ? "gareDefaultCardOff" : "gareDefaultCardOn"
          }
        >
          Gare: {station}
        </li>
        <li className={tgv === null ? "tgvDefaultCardOff" : "tgvDefaultCardOn"}>
          Numéro de TGV: {tgv}
        </li>
        <li className={ter === null ? "terDefaultCardOff" : "terDefaultCardOn"}>
          Numéro de TER: {ter}
        </li>
        <li
          className={
            track === null ? "trackDefaultCardOff" : "trackDefaultCardOn"
          }
        >
          Numéro de ligne: {track}
        </li>
        <li>
          {/* <a href={description} target="_blank" rel="noreferrer">
            voir photo
          </a> */}
          Description :{description}
        </li>
        <li
          className={
            image === "" ? "imageDefaultCardOff" : "imageDefaultCardOn"
          }
        >
          <img className="imgCard" src={image} alt={imgAlt} />
          {/* <a href={image} target="_blank" rel="noreferrer">
            voir photo
          </a> */}
        </li>
        <li
          className={
            latitude === null ? "geolocDefaultCardOff" : "geolocDefaultCardOn"
          }
        >
          Géolocalisation : {latitude}, {longitude}
        </li>
        <li>Traitement : {traitement}</li>
      </ul>
    </div>
  );
};
