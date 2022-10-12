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

  const picture = defaut[0].picture;
  useEffect(() => {
    getDefaultView(id_default, setDefaut);
  }, []);

  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/updateDefaultUser/${cp}/${id_default}`);
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
    <div className="defaultView-container">
      <Header
        profileCss="profileDefaultViewUser"
        loginCss="loginDefaultViewUser"
        adminOffCss="adminOffDefaultViewUser"
        logoutCss="logoutDefaultViewUser"
      />
      <div className="defaultViewCard-container">
        {defaut && (
          <>
            {defaut.map((items) => (
              <div
                className="defaultView-field-container"
                key={items.id_default}
              >
                <h1> VOTRE DECLARATION </h1>
                <h2
                  className={
                    items.station === null
                      ? "stationViewOff"
                      : "stationViewOn items"
                  }
                >
                  <span className="titles">
                    Gare : <br />
                  </span>
                  {items.station}
                </h2>
                <h2
                  className={
                    items.ter_number === null ? "terViewOff" : "terViewOn items"
                  }
                >
                  <span className="titles">
                    TER : <br />
                  </span>
                  {items.ter_number}
                </h2>
                <h2
                  className={
                    items.tgv_number === null ? "tgvViewOff" : "tgvViewOn items"
                  }
                >
                  <span className="titles">
                    TGV : <br />
                  </span>
                  {items.tgv_number}
                </h2>
                <h2
                  className={
                    items.railway_track_number === null
                      ? "trackViewOff"
                      : "trackViewOn items"
                  }
                >
                  <span className="titles">
                    Numéro de ligne : <br />
                  </span>
                  {items.railway_track_number}
                </h2>
                <p className="textDefaultView">
                  <span className="titles Description">
                    Description : <br />
                  </span>
                  {items.description}
                </p>
                <img
                  className={
                    items.picture === "" ? "imageViewOff" : "imageViewOn"
                  }
                  src={items.picture}
                  alt="image"
                  onClick={handleClickOpen}
                  onKeyPress={onKeyPressHandler}
                  role="presentation"
                />
                <p
                  className={
                    items.latitude === null
                      ? "geolocViewOff"
                      : "geolocViewOn geolocation"
                  }
                >
                  <span className="titles">
                    Géolocalisation : <br />
                  </span>
                  {items.latitude}, {items.longitude}
                </p>

                <p className="textDefaultView treatment">
                  <span className="titles">
                    Traitement : <br />
                  </span>
                  {items.treatment}
                </p>
                <Button
                  classButton="update-defaultView"
                  fieldButton="CONTINUER LA MODIFICATION"
                  type="button"
                  onClick={handleUpdate}
                />
              </div>
            ))}
          </>
        )}
      </div>
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
              <img className="picturePopup" src={picture} alt="image" />
            </div>
            <div className="popUpfooter"> </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DefaultView;
