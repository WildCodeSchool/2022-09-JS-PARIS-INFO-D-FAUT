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
  stateContainer,
  cp,
}) => {
  const state = (stateCss) => {
    if (stateCss === "traité") {
      return "traité-container ";
    }
    if (stateCss === "En cours de traitement") {
      return "encours-container ";
    }
    return "nontraité-container";
  };

  return (
    <div className={state(stateContainer)}>
      <ul className="ul-default-card">
        <li>CP : {cp} </li>
        <li
          className={
            station === null ? "stationDefaultCardOff" : "stationDefaultCardOn"
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
        <li>Description :{description}</li>
        <li
          className={
            image === "" ? "imageDefaultCardOff" : "imageDefaultCardOn"
          }
        >
          <img className="imgCard" src={image} alt={imgAlt} />
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
