import React, { useEffect, useContext } from "react";
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
        profileCss="profileUpdateDefaultsViewAdmin"
        loginCss="loginUpdateDefaultsViewAdmin"
        adminOffCss="adminOffUpdateDefaultsViewAdmin"
        logoutCss="logoutUpdateDefaultsViewAdmin"
      />
      <div className="defaultViewAdminCard-container">
        {defaut && (
          <>
            {defaut.map((items) => (
              <div
                className="defaultViewAdmin-field-container"
                key={items.id_default}
              >
                <h1> Vérification du défaut :</h1>
                <h2
                  className={
                    items.station === null
                      ? "stationViewAdminOff"
                      : "stationViewAdminOn items"
                  }
                >
                  <span className="titles">
                    Gare: <br />
                  </span>
                  {items.station}
                </h2>
                <h2
                  className={
                    items.ter_number === null
                      ? "terViewAdminOff"
                      : "terViewAdminOn items"
                  }
                >
                  <span className="titles">
                    TER : <br />
                  </span>
                  {items.ter_number}
                </h2>
                <h2
                  className={
                    items.tgv_number === null
                      ? "tgvViewAdminOff"
                      : "tgvViewAdminOn items"
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
                      ? "trackViewAdminOff"
                      : "trackViewAdminOn items"
                  }
                >
                  <span className="titles">
                    Numéro de ligne : <br />
                  </span>
                  {items.railway_track_number}
                </h2>
                <p className="textDefaultViewAdmin">
                  <span className="titles Description">
                    Description : <br />
                  </span>
                  {items.description}
                </p>
                <img
                  className={
                    items.picture === ""
                      ? "imageViewAdminOff"
                      : "imageViewAdminOn"
                  }
                  src={items.picture}
                  alt="image"
                />
                <p
                  className={
                    items.latitude === null
                      ? "geolocViewAdminOff"
                      : "geolocViewAdminOn geolocation"
                  }
                >
                  <span className="titles">
                    Géolocalisation : <br />
                  </span>
                  {items.latitude}, {items.longitude}
                </p>
                <p className="textDefaultViewAdmin treatment">
                  <span className="titles">
                    Traitement : <br />
                  </span>
                  {items.treatment}
                </p>
                <Button
                  classButton="update-state"
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

export default DefaultViewAdmin;
