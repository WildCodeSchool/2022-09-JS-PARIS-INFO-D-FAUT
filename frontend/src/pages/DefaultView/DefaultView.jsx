import React, { useEffect, useContext } from "react";
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
        backCss="backUpdateDefaultsUser"
        profileCss="profileUpdateDefaultsUser"
        loginCss="loginUpdateDefaultsUser"
        adminOffCss="adminOffUpdateDefaultsUser"
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
                    items.station === null ? "stationViewOff" : "stationViewOn"
                  }
                >
                  Gare : <br />
                  {items.station}
                </h2>
                <h2
                  className={
                    items.ter_number === null ? "terViewOff" : "terViewOn"
                  }
                >
                  TER : <br />
                  {items.ter_number}
                </h2>
                <h2
                  className={
                    items.tgv_number === null ? "tgvViewOff" : "tgvViewOn"
                  }
                >
                  TGV : <br />
                  {items.tgv_number}
                </h2>
                <h2
                  className={
                    items.railway_track_number === null
                      ? "trackViewOff"
                      : "trackViewOn"
                  }
                >
                  Numéro de ligne : <br />
                  {items.railway_track_number}
                </h2>
                <p className="textDefaultView">
                  Description : <br />
                  {items.description}
                </p>
                <img
                  className={
                    items.picture === "" ? "imageViewOff" : "imageViewOn"
                  }
                  src={items.picture}
                  alt="image"
                />
                <p
                  className={
                    items.latitude === null ? "geolocViewOff" : "geolocViewOn"
                  }
                >
                  Géolocalisation : <br />
                  {items.latitude}, {items.longitude}
                </p>

                <p className="textDefaultView">
                  Traitement : <br />
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
      <Footer />
    </div>
  );
};

export default DefaultView;
