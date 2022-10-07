import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../../services/Firebase/firebase";
import "./GareEtConnexions.css";
import { postDefaults } from "../../services/axios/AxiosDefaults";
import {
  Footer,
  Header,
  Input,
  Button,
  Textarea,
} from "../../components/index";
import { GeolocationContext, UserContext } from "../../context/index";

const GareEtConnexions = () => {
  const { user } = useContext(UserContext);
  const cp = user.cp;
  const user_id = user.id_user;
  const navigate = useNavigate();

  const { geolocation } = useContext(GeolocationContext);
  const latitudeDefault = geolocation.latitude;
  const longitudeDefault = geolocation.longitude;

  const [station, setStation] = useState("");
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
    navigate(`/items/${cp}`);
  };

  const data = {
    user_id,
    station,
    description,
    picture,
    longitude,
    latitude,
  };

  const alertSucess = () => {
    alert("🏆 Votre défaut a bien été enregistré ! 😀 🏆");
  };

  const verifyDescription = () => {
    if (description !== "") {
      return true;
    }
    alert("Veuillez décrire le défaut");
    return false;
  };

  const verifyStation = () => {
    if (station !== "") {
      return true;
    }
    alert("Veuillez indiquer la gare");
    return false;
  };

  const handleSubmit = () => {
    if (verifyDescription(description) && verifyStation(station)) {
      postDefaults(
        data,
        setStation(""),
        setDescription(""),
        setPicture(""),
        setImage(null),
        alertSucess(),
        nav()
      );
    }
  };

  return (
    <div className="gare-container">
      <Header
        backCss="backGare"
        profileCss="profileGare"
        loginCss="loginGare"
        admin0Css="admin0Gare"
      />
      <form className="gare_champ-container">
        <h1>GARE & CONNEXIONS</h1>
        <Input
          className="inputGare"
          onChange={(e) => setStation(e.target.value)}
          value={station}
          forId="gare"
          type="text"
          champ="Gare concernée"
        />
        <Textarea
          className="textGare"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          forId="field"
          type="text"
        />
        <Input
          className="inputGare"
          onChange={(e) => setImage(e.target.files[0])}
          forId="file"
          type="file"
          accept=".png, .jpg, .jpeg, .gif"
          champ="Joindre une photographie"
        />
        <Input type="button" onClick={handleUpload} champ="télécharger" />

        <br />

        <img
          className={picture !== "" ? "pictureGareOn" : "pictureGareOff "}
          src={picture}
          alt="image"
        />

        <Input
          className="inputGare"
          forId="file"
          onChange={(e) => setLatitude(e.target.value)}
          type="text"
          value={latitude}
          champ="Latitude"
        />
        <Input
          className="inputGare"
          forId="file2"
          onChange={(e) => setLongitude(e.target.value)}
          type="text"
          value={longitude}
          champ="Longitude"
        />
        <Button
          classButton="envoyer"
          onClick={(e) => handleSubmit(e)}
          champButton="ENVOYER"
          type="button"
        />
      </form>
      <Footer />
    </div>
  );
};

export default GareEtConnexions;
