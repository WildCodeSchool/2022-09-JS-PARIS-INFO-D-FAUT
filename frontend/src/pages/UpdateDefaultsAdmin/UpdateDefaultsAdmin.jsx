import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateDefaultsAdmin.css";
import {
  // UpdateDefaultsAdmin
  updateDefault,
  getDefaultView,
} from "../../services/axios/AxiosDefaults";
import { Geolocation } from "../../services/Geolocation/Geolocation";
import { Button, Footer, Header } from "../../components/index";
import { UserContext, DefaultContext } from "../../context/index";

const UpdateDefaultsAdmin = () => {
  const { id_default } = useParams();
  const { user } = useContext(UserContext);
  const cp = user.cp;
  const user_id = user.id_user;
  const navigate = useNavigate();

  const { defaut } = useContext(DefaultContext);
  const station = defaut[0].station;
  const railway_track_number = defaut[0].railway_track_number;
  const ter_number = defaut[0].ter_number;
  const tgv_number = defaut[0].tgv_number;
  const description = defaut[0].description;
  const picture = defaut[0].picture;
  const latitude = defaut[0].latitude;
  const longitude = defaut[0].longitude;
  const treatmentDefault = defaut[0].treatment;

  const [problem, setProblem] = useState([]);

  const [treatment, setTreatment] = useState(treatmentDefault);
  const nav = () => {
    navigate("/admin/defaults");
  };
  useEffect(() => {
    getDefaultView(id_default, setProblem);
  }, []);

  const data = {
    user_id,
    station,
    railway_track_number,
    ter_number,
    tgv_number,
    description,
    picture,
    longitude,
    latitude,
    treatment,
  };

  const alertSucess = () => {
    alert("🏆 L'état du traitement a bien été modifié ! 😀 🏆");
  };

  return (
    <div className="updateDefaultsAdmin-container">
      {Geolocation()}
      <Header
        backCss="backUpdateDefaultsUser"
        profileCss="profileUpdateDefaultsUser"
        loginCss="loginUpdateDefaultsUser"
        admin0Css="admin0UpdateDefaultsUser"
      />
      <form className="gare_champ-container">
        <h1>MODIFICATION</h1>
        <h2>{cp}</h2>

        <h2
          className={
            station === null ? "stationViewAdminOff" : "stationViewAdminOn"
          }
        >
          Gare: {station}
        </h2>
        <h2
          className={ter_number === null ? "terViewAdminOff" : "terViewAdminOn"}
        >
          TER : {ter_number}
        </h2>
        <h2
          className={tgv_number === null ? "tgvViewAdminOff" : "tgvViewAdminOn"}
        >
          TGV : {tgv_number}
        </h2>
        <h2
          className={
            railway_track_number === null
              ? "trackViewAdminOff"
              : "trackViewAdminOn"
          }
        >
          Numéro de ligne : {railway_track_number}
        </h2>
        <h3>Description : {description}</h3>
        <img
          className={picture === "" ? "imageViewAdminOff" : "imageViewAdminOn"}
          src={picture}
          alt="image"
        />

        <label className="labelSelect" htmlFor="labelSelect">
          Statut du defaut
        </label>
        <select
          id="labelSelect"
          className="selectEtat"
          onChange={(e) => setTreatment(e.target.value)}
        >
          <option>Non traité</option>
          <option>En cours de traitement</option>
          <option>traité</option>
        </select>
        <Button
          classButton="envoyer"
          onClick={(e) =>
            updateDefault(id_default, data, setProblem, alertSucess(), nav(), e)
          }
          champButton="ENVOYER"
          type="button"
        />
      </form>
      <Footer />
    </div>
  );
};

export default UpdateDefaultsAdmin;
