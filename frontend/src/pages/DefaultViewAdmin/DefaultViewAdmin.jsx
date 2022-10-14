import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DefaultViewAdmin.css";
import { getDefaultView } from "../../services/axios/AxiosDefaults";
import { DefaultContext, UserContext } from "../../context/index";
import { Footer, Header, Button } from "../../components/index";

const DefaultViewAdmin = () => {
  const { id_default } = useParams();
  const { defaut, setDefaut } = useContext(DefaultContext);
  const { user } = useContext(UserContext);
  const cp = user.cp;

  useEffect(() => {
    getDefaultView(id_default, setDefaut);
  }, []);

  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/updateDefaultsAdmin/${cp}/${id_default}`);
  };

  return (
    <div className="defaultViewAdmin-container">
      <Header
        profileCss="profileDefaultsViewAdmin"
        loginCss="loginDefaultsViewAdmin"
        adminOffCss="adminOffDefaultsViewAdmin"
        logoutCss="logoutDefaultsViewAdmin"
      />
      {defaut && (
        <div className="defaultViewAdminCard-container">
          {defaut.map((items) => (
            <div
              className="defaultViewAdmin-field-container"
              key={items.id_default}
            >
              <h1 className="titleDefaultViewAdmin">
                Vérification du défaut :
              </h1>
              <h2
                className={
                  items.station === null
                    ? "stationViewAdminOff"
                    : "stationViewAdminOn itemsAdmin"
                }
              >
                <span className="titlesAdmin">
                  Gare: <br />
                </span>
                {items.station}
              </h2>
              <h2
                className={
                  items.ter_number === null
                    ? "terViewAdminOff"
                    : "terViewAdminOn itemsAdmin"
                }
              >
                <span className="titlesAdmin">
                  TER : <br />
                </span>
                {items.ter_number}
              </h2>
              <h2
                className={
                  items.tgv_number === null
                    ? "tgvViewAdminOff"
                    : "tgvViewAdminOn itemsAdmin"
                }
              >
                <span className="titlesAdmin">
                  TGV : <br />
                </span>
                {items.tgv_number}
              </h2>
              <h2
                className={
                  items.railway_track_number === null
                    ? "trackViewAdminOff"
                    : "trackViewAdminOn itemsAdmin"
                }
              >
                <span className="titlesAdmin">
                  Numéro de ligne : <br />
                </span>
                {items.railway_track_number}
              </h2>
              <p className="textDefaultViewAdmin descriptionGridAdmin">
                <span className="titlesAdmin">
                  Description : <br />
                </span>
                {items.description}
              </p>
              <div className="imgGridAdmin">
                <img
                  className={
                    items.picture === ""
                      ? "imageViewAdminOff"
                      : "imageViewAdminOn"
                  }
                  src={items.picture}
                  alt="image"
                />
              </div>
              <p
                className={
                  items.latitude === null
                    ? "geolocViewAdminOff"
                    : "geolocViewAdminOn geolocationGridAdmin "
                }
              >
                <span className="titlesAdmin">
                  Géolocalisation : <br />
                </span>
                {items.latitude}, {items.longitude}
              </p>
              <p className="textDefaultViewAdmin treatmentGridAdmin">
                <span className="titlesAdmin">
                  Traitement : <br />
                </span>
                {items.treatment}
              </p>
              <div className="buttonGridAdmin">
                <Button
                  classButton="update-stateAdmin"
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

export default DefaultViewAdmin;
