import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./DefaultViewAdmin.css";
import { getUserDefaultById } from "../../services/axios/AxiosDefaults";
import { DefaultContext, UserContext } from "../../context/index";
import { Footer, Header, Button } from "../../components/index";

const DefaultViewAdmin = () => {
  const { id_default } = useParams();
  const { defaut, setDefaut } = useContext(DefaultContext);
  const { user } = useContext(UserContext);
  const cp = user.cp;
  useEffect(() => {
    getUserDefaultById(id_default, setDefaut);
  }, []);

  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/updateDefaultsAdmin/${cp}/${id_default}`);
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
              <h3>station : {items.station}</h3>
              <h3>TER : {items.ter_number}</h3>
              <h3>TGV : {items.tgv_number}</h3>
              <h3>Description : {items.description}</h3>
              <img className="img-items" src={items.picture} alt="image" />
              <h3>Latitude: {items.latitude}</h3>
              <h3>Longitude {items.longitude}</h3>
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

export default DefaultViewAdmin;
