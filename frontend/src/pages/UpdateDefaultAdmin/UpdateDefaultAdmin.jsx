import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateDefaultAdmin.css";
import {
  updateDefault,
  getDefaultView,
} from "../../services/axios/AxiosDefaults";
import { Geolocation } from "../../services/Geolocation/Geolocation";
import { Button, Footer, Header } from "../../components/index";
import { UserContext, DefaultContext } from "../../context/index";

const UpdateDefaultAdmin = () => {
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

  const alertSuccess = () => {
    alert("🏆 L'état du traitement a bien été modifié ! 😀 🏆");
  };

  return (
    <div className="updateDefaultAdmin-container">
      {Geolocation()}
      <Header
        backCss="backUpdateDefaultAdmin"
        profileCss="profileUpdateDefaultAdmin"
        loginCss="loginUpdateDefaultAdmin"
        adminOffCss="adminOffUpdateDefaultAdmin"
      />
      <form className="updateDefaultAdmin_field-container">
        <h1>MODIFICATION</h1>
        <h2>{cp}</h2>

        <h3
          className={
            station === null ? "stationUpdateAdminOff" : "stationUpdateAdminOn"
          }
        >
          Gare: {station}
        </h3>
        <h3
          className={
            ter_number === null ? "terUpdateAdminOff" : "terUpdateAdminOn"
          }
        >
          TER : {ter_number}
        </h3>
        <h3
          className={
            tgv_number === null ? "tgvUpdateAdminOff" : "tgvUpdateAdminOn"
          }
        >
          TGV : {tgv_number}
        </h3>
        <h3
          className={
            railway_track_number === null
              ? "trackUpdateAdminOff"
              : "trackUpdateAdminOn"
          }
        >
          Numéro de ligne : {railway_track_number}
        </h3>
        <p className="textUpdateDefaultAdmin">Description : {description}</p>
        <img
          className={
            picture === "" ? "imageUpdateAdminOff" : "imageUpdateAdminOn"
          }
          src={picture}
          alt="image"
        />
        <div className="flexLabelSelect">
          <label className="labelSelect" htmlFor="labelSelect">
            Statut du défaut
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
        </div>
        <Button
          classButton="sendUpdateAdmin"
          onClick={(e) =>
            updateDefault(
              id_default,
              data,
              setProblem,
              alertSuccess(),
              nav(),
              e
            )
          }
          fieldButton="ENVOYER"
          type="button"
        />
      </form>
      <Footer />
    </div>
  );
};

export default UpdateDefaultAdmin;
