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
                    : "stationViewAdminOn"
                }
              >
                Gare: {items.station}
              </h2>
              <h2
                className={
                  items.ter_number === null
                    ? "terViewAdminOff"
                    : "terViewAdminOn"
                }
              >
                TER : {items.ter_number}
              </h2>
              <h2
                className={
                  items.tgv_number === null
                    ? "tgvViewAdminOff"
                    : "tgvViewAdminOn"
                }
              >
                TGV : {items.tgv_number}
              </h2>
              <h2
                className={
                  items.railway_track_number === null
                    ? "trackViewAdminOff"
                    : "trackViewAdminOn"
                }
              >
                Numéro de ligne : {items.railway_track_number}
              </h2>
              <h3>Description : {items.description}</h3>
              <img
                className={
                  items.picture === ""
                    ? "imageViewAdminOff"
                    : "imageViewAdminOn"
                }
                src={items.picture}
                alt="image"
              />
              <h3
                className={
                  items.latitude === null
                    ? "geolocViewAdminOff"
                    : "geolocViewAdminOn"
                }
              >
                Géolocalisation : {items.latitude}, {items.longitude}
              </h3>
              <h3>Traitement : {items.treatment}</h3>
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

      <Footer />
    </div>
  );
};

export default DefaultViewAdmin;
