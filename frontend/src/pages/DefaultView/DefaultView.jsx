import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./DefaultView.css";

import { getUserDefaultById } from "../../services/axios/AxiosDefaults";
import { DefaultContext, UserContext } from "../../context/index";
import { Footer, Header, Button } from "../../components/index";

const DefaultView = () => {
  const { id_default } = useParams();
  const { defaut, setDefaut } = useContext(DefaultContext);
  const { user } = useContext(UserContext);
  const cp = user.cp;
  useEffect(() => {
    getUserDefaultById(id_default, setDefaut);
  }, []);

  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/updateDefaultsUser/${cp}/${id_default}`);
  };

  return (
    <div className="defaultView-container">
      <Header
        backCss="backUpdateDefaultsUser"
        profileCss="profileUpdateDefaultsUser"
        loginCss="loginUpdateDefaultsUser"
        admin0Css="admin0UpdateDefaultsUser"
      />

      {defaut && (
        <>
          {defaut.map((items) => (
            <div
              className="defaultView-champs-container"
              key={items.id_default}
            >
              <h1> Verification du défaut :</h1>
              <h2
                className={
                  items.station === null ? "stationViewOff" : "stationViewOn"
                }
              >
                Gare: {items.station}
              </h2>
              <h2
                className={
                  items.ter_number === null ? "terViewOff" : "terViewOn"
                }
              >
                TER : {items.ter_number}
              </h2>
              <h2
                className={
                  items.tgv_number === null ? "tgvViewOff" : "tgvViewOn"
                }
              >
                TGV : {items.tgv_number}
              </h2>
              <h2
                className={
                  items.railway_track_number === null
                    ? "trackViewOff"
                    : "trackViewOn"
                }
              >
                Numéro de ligne : {items.railway_track_number}
              </h2>
              <h3>Description : {items.description}</h3>
              <img
                className={
                  items.picture === "" ? "imageViewOff" : "imageViewOn"
                }
                src={items.picture}
                alt="image"
              />
              <h3
                className={
                  items.latitude === null ? "geolocViewOff" : "geolocViewOn"
                }
              >
                Geolocalisation : {items.latitude}, {items.longitude}
              </h3>

              <h3>Traitement : {items.treatment}</h3>
              <Button
                classButton="update-profile"
                champButton="CONTINUER LA MODIFICATION"
                type="button"
                onClick={handleUpdate}
              />
            </div>
          ))}
        </>
      )}

      <Footer />
    </div>
  );
};

export default DefaultView;
