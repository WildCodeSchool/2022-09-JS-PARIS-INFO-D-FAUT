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
        <li className="cpDefaultCard">CP: {cp} </li>
        <li
          className={
            station === null ? "stationDefaultCardOff" : "stationDefaultCardOn"
          }
        >
          <span className="spanDefaultCard">Gare:</span> <br /> {station}
        </li>
        <li className={tgv === null ? "tgvDefaultCardOff" : "tgvDefaultCardOn"}>
          <span className="spanDefaultCard">Numéro de TGV:</span> <br /> {tgv}
        </li>
        <li className={ter === null ? "terDefaultCardOff" : "terDefaultCardOn"}>
          <span className="spanDefaultCard">Numéro de TER:</span> <br /> {ter}
        </li>
        <li
          className={
            track === null ? "trackDefaultCardOff" : "trackDefaultCardOn"
          }
        >
          <span className="spanDefaultCard">Numéro de ligne:</span> <br />{" "}
          {track}
        </li>
        <li className="descriptionDefaultCard">
          <span className="spanDefaultCard">Description:</span> <br />
          {description}
        </li>
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
          <span className="spanDefaultCard">Géolocalisation:</span> <br />
          {latitude}, {longitude}
        </li>
        <li>
          <span className="spanDefaultCard">Traitement:</span> <br />
          {traitement}
        </li>
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
