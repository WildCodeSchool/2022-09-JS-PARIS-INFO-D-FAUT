import React, { useState } from "react";
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
  const [zoom, setZoom] = useState(false);
  const handleClickOpen = () => {
    setZoom(!zoom);
  };
  const onKeyPressHandler = () => {
    setZoom(false);
  };
  const closePopup = () => {
    setZoom(false);
  };
  return (
    <div className="defaultCard-container">
      <ul className={state(stateContainer)}>
        <li>CP: {cp} </li>
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
        <li className="descriptionDefaultCard">Description: {description}</li>
        <li
          className={
            image === "" ? "imageDefaultCardOff" : "imageDefaultCardOn"
          }
        >
          <img
            className="imgCard"
            src={image}
            alt={imgAlt}
            onClick={handleClickOpen}
            onKeyPress={onKeyPressHandler}
            role="presentation"
          />
        </li>
        <li
          className={
            latitude === null ? "geolocDefaultCardOff" : "geolocDefaultCardOn"
          }
        >
          Géolocalisation: {latitude}, {longitude}
        </li>
        <li>Traitement: {traitement}</li>
      </ul>
      <div>
        {zoom ? (
          <div className="popup">
            <div className="popUpHeader">
              <h5
                className="h5PopUpHeader"
                onClick={closePopup}
                onKeyPress={onKeyPressHandler}
                role="presentation"
              >
                ✖️
              </h5>
            </div>
            <div className="popupBody">
              <img className="picturePopup" src={image} alt="image" />
            </div>
            <div className="popUpfooter"> </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
