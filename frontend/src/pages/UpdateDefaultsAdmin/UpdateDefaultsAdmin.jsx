import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateDefaultsAdmin.css";
import {
  // UpdateDefaultsAdmin
  updateDefaults,
  getUserDefaultById,
} from "../../services/axios/AxiosDefaults";
import { Geolocalisation } from "../../services/Geolocalisation/Geolocalisation";
import { Button, Footer, Header } from "../../components/index";
import { UserContext, DefaultContext } from "../../context/index";

const UpdateDefaultsAdmin = () => {
  const { id_default } = useParams();
  const { user } = useContext(UserContext);
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
    getUserDefaultById(id_default, setProblem);
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

  return (
    <div className="updateDefaultsAdmin-container">
      {Geolocalisation()}
      <Header
        backCss="backUpdateDefaultsUser"
        profileCss="profileUpdateDefaultsUser"
        loginCss="loginUpdateDefaultsUser"
        admin0Css="admin0UpdateDefaultsUser"
      />
      <form className="gare_champ-container">
        <h1>MODIFICATION</h1>

        <select
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
            updateDefaults(id_default, data, setProblem, nav(), e)
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
