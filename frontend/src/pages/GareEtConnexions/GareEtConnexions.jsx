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

  const alertSuccess = () => {
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
        alertSuccess(),
        nav()
      );
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
          field="Gare concernée"
        />
        <Textarea
          className="textStation"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          forId="field"
          type="text"
        />
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
        <div className="latitudeLongitude">
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
        </div>
        <Button
          classButton="sendStation"
          onClick={(e) => handleSubmit(e)}
          fieldButton="ENVOYER"
          type="button"
        />
      </form>
      <Footer />
    </div>
  );
};

export default GareEtConnexions;
