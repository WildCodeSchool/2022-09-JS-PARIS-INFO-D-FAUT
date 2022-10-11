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

  const [stationRegex, setStationRegex] = useState(true);
  const [descriptionRegex, setDescriptionRegex] = useState(true);
  const [success, setSuccess] = useState(false);

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
    station,
    description,
    picture,
    longitude,
    latitude,
  };

  const verifyStation = () => {
    if (station !== "") {
      setStationRegex(true);
      return true;
    }
    setStationRegex(false);
    return false;
  };

  const verifyDescription = () => {
    if (description !== "") {
      setDescriptionRegex(true);
      return true;
    }
    setDescriptionRegex(false);
    return false;
  };

  const alertSuccess = () => {
    setSuccess(true);
  };

  const duration = () => {
    setTimeout(nav, 3000);
  };

  const handleSubmit = () => {
    if (verifyStation(station) && verifyDescription(description)) {
      postDefaults(data);
      setStation("");
      setDescription("");
      setPicture("");
      setImage(null);
      alertSuccess();
      duration();
    }
  };

  return (
    <div className="station-container">
      <Header
        backCss="backGare"
        profileCss="profileGare"
        loginCss="loginGare"
        adminOffCss="adminOffGare"
      />
      <form className="stationField-container">
        <h1>GARE & CONNEXIONS</h1>
        <Input
          className="inputStation"
          onChange={(e) => setStation(e.target.value)}
          value={station}
          forId="gare"
          type="text"
          field="Gare concernée *"
        />
        <p className="fieldFalse">
          {stationRegex === false ? "Veuillez indiquer la gare" : ""}
        </p>

        <Textarea
          className="textStation"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          forId="field"
          type="text"
        />
        <p className="fieldFalse">
          {descriptionRegex === false ? "Veuillez décrire le défaut" : ""}
        </p>

        <Input
          className="inputStationImg"
          onChange={(e) => setImage(e.target.files[0])}
          forId="file"
          type="file"
          accept=".png, .jpg, .jpeg, .gif"
          field="Joindre une photographie"
        />
        <Button
          classButton="stationUpload"
          type="button"
          name="button"
          onClick={handleUpload}
          fieldButton="Télécharger"
        />

        <br />

        <img
          className={picture !== "" ? "pictureStationOn" : "pictureStationOff "}
          src={picture}
          alt="image"
        />

        <Input
          className="inputStation"
          forId="file"
          onChange={(e) => setLatitude(e.target.value)}
          type="text"
          value={latitude}
          field="Latitude"
        />
        <Input
          className="inputStation"
          forId="fileTwo"
          onChange={(e) => setLongitude(e.target.value)}
          type="text"
          value={longitude}
          field="Longitude"
        />
        <Button
          classButton="sendStation"
          onClick={(e) => handleSubmit(e)}
          fieldButton="ENVOYER"
          type="button"
        />
        <p className="fieldFalse">
          {success === true
            ? "🏆 Votre défaut a bien été enregistré ! 😀 🏆"
            : ""}
        </p>
      </form>
      <Footer />
    </div>
  );
};

export default GareEtConnexions;
