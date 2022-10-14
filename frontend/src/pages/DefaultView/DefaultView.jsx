import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DefaultView.css";

import { getDefaultView } from "../../services/axios/AxiosDefaults";
import { DefaultContext, UserContext } from "../../context/index";
import { Footer, Header, Button } from "../../components/index";

const DefaultView = () => {
  const { id_default } = useParams();
  const { defaut, setDefaut } = useContext(DefaultContext);
  const { user } = useContext(UserContext);
  const cp = user.cp;

  useEffect(() => {
    getDefaultView(id_default, setDefaut);
  }, []);

  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/updateDefaultUser/${cp}/${id_default}`);
  };

  return (
    <div className="defaultView-container">
      <Header
        profileCss="profileDefaultViewUser"
        loginCss="loginDefaultViewUser"
        adminOffCss="adminOffDefaultViewUser"
        logoutCss="logoutDefaultViewUser"
      />
      {defaut && (
        <div className="defaultViewCard-container">
          {defaut.map((items) => (
            <div className="defaultView-field-container" key={items.id_default}>
              <h1 className="titleDefaultView"> VOTRE DECLARATION </h1>
              <h2
                className={
                  items.station === null
                    ? "stationViewOff"
                    : "stationViewOn itemsView"
                }
              >
                <span className="titlesView">
                  Gare : <br />
                </span>
                {items.station}
              </h2>
              <h2
                className={
                  items.ter_number === null
                    ? "terViewOff"
                    : "terViewOn itemsView"
                }
              >
                <span className="titlesView">
                  TER : <br />
                </span>
                {items.ter_number}
              </h2>
              <h2
                className={
                  items.tgv_number === null
                    ? "tgvViewOff"
                    : "tgvViewOn itemsView"
                }
              >
                <span className="titlesView">
                  TGV : <br />
                </span>
                {items.tgv_number}
              </h2>
              <h2
                className={
                  items.railway_track_number === null
                    ? "trackViewOff"
                    : "trackViewOn itemsView"
                }
              >
                <span className="titlesView">
                  Numéro de ligne : <br />
                </span>
                {items.railway_track_number}
              </h2>
              <p className="textDefaultView descriptionView">
                <span className="titlesView">
                  Description : <br />
                </span>
                {items.description}
              </p>
              <div className="imgGrid">
                <img
                  className={
                    items.picture === "" ? "imageViewOff" : "imageViewOn"
                  }
                  src={items.picture}
                  alt="image"
                />
              </div>
              <p
                className={
                  items.latitude === null
                    ? "geolocViewOff"
                    : "geolocViewOn geolocationView"
                }
              >
                <span className="titlesView">
                  Géolocalisation : <br />
                </span>
                {items.latitude}, {items.longitude}
              </p>

              <p className="textDefaultView treatmentView">
                <span className="titlesView">
                  Traitement : <br />
                </span>
                {items.treatment}
              </p>
              <div className="buttonGrid">
                <Button
                  classButton="update-defaultView"
                  fieldButton="CONTINUER LA MODIFICATION"
                  type="button"
                  onClick={handleUpdate}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DefaultView;
