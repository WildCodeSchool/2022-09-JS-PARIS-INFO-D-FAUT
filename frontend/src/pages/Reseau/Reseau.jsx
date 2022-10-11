import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../../services/Firebase/firebase";
import "./Reseau.css";
import { postDefaults } from "../../services/axios/AxiosDefaults";
import {
  Footer,
  Header,
  Input,
  Button,
  Textarea,
} from "../../components/index";
import { GeolocationContext, UserContext } from "../../context/index";

const Reseau = () => {
  const { user } = useContext(UserContext);
  const cp = user.cp;
  const user_id = user.id_user;
  const navigate = useNavigate();

  const { geolocation } = useContext(GeolocationContext);
  const latitudeDefault = geolocation.latitude;
  const longitudeDefault = geolocation.longitude;

  const [railway_track_number, setRailwayNumber] = useState(0);
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [latitude, setLatitude] = useState(latitudeDefault);
  const [longitude, setLongitude] = useState(longitudeDefault);

  const [image, setImage] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const result = await uploadFile(image);
      setPicture(result);
    } catch (error) {
      console.error(error);
    }
  };
  const nav = () => {
    navigate(`/home/${cp}`);
  };

  const data = {
    user_id,
    railway_track_number,
    description,
    picture,
    longitude,
    latitude,
  };

  const alertSuccess = () => {
    alert("🏆 Votre défaut a bien été enregistré ! 😀 🏆");
  };
  const regexRailway = (value) => {
    return /^[0-9]{3,}/.test(value);
  };

  const verifyRailway = () => {
    if (regexRailway(railway_track_number)) {
      return true;
    }
    alert("Veuillez indiquer le numéro de ligne concernée");
    return false;
  };
  const verifyDescription = () => {
    if (description !== "") {
      return true;
    }
    alert("Veuillez décrire le défaut");
    return false;
  };

  const handleSubmit = () => {
    if (verifyDescription(description) && verifyRailway(railway_track_number)) {
      postDefaults(data);
      setRailwayNumber(0);
      setDescription("");
      setPicture("");
      setImage(null);
      alertSuccess();
      nav();
    }
  };

  return (
    <div className="reseau-container">
      <Header
        backCss="backReseau"
        profileCss="profileReseau"
        loginCss="loginReseau"
        adminOffCss="adminOffReseau"
      />

      <form className="reseauField-container">
        <h1>RESEAU</h1>

        <Input
          className="inputReseau"
          onChange={(e) => setRailwayNumber(e.target.value)}
          value={railway_track_number}
          forId="ligne"
          type="number"
          field="Numéro de ligne / Emprise"
        />
        <Textarea
          className="textReseau"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          forId="field"
          type="text"
        />
        <Input
          className="inputReseauImg"
          onChange={(e) => setImage(e.target.files[0])}
          forId="file"
          type="file"
          accept=".png, .jpg, .jpeg, .gif"
          field="Joindre une photographie"
        />
        <Button
          classButton="reseauUpload"
          type="button"
          name="button"
          onClick={handleUpload}
          fieldButton="Télécharger"
        />

        <br />

        <img
          className={picture !== "" ? "pictureReseauOn" : "pictureReseauOff "}
          src={picture}
          alt="image"
        />

        <Input
          className="inputReseau"
          forId="file"
          onChange={(e) => setLatitude(e.target.value)}
          type="text"
          value={latitude}
          field="Latitude"
        />
        <Input
          className="inputReseau"
          forId="fileTwo"
          onChange={(e) => setLongitude(e.target.value)}
          type="text"
          value={longitude}
          field="Longitude"
        />
        <Button
          classButton="sendReseau"
          onClick={(e) => handleSubmit(e)}
          fieldButton="ENVOYER"
          type="button"
        />
      </form>

      <Footer />
    </div>
  );
};

export default Reseau;
