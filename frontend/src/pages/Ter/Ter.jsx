import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../../services/Firebase/firebase";
import "./Ter.css";
import { postDefaults } from "../../services/axios/AxiosDefaults";
import {
  Footer,
  Header,
  Input,
  Button,
  Textarea,
} from "../../components/index";
import { GeolocationContext, UserContext } from "../../context/index";

const Ter = () => {
  const { user } = useContext(UserContext);
  const cp = user.cp;
  const user_id = user.id_user;
  const navigate = useNavigate();

  const { geolocation } = useContext(GeolocationContext);
  const latitudeDefault = geolocation.latitude;
  const longitudeDefault = geolocation.longitude;

  const [ter_number, setTerNumber] = useState(0);
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
    ter_number,
    description,
    picture,
    longitude,
    latitude,
  };

  const alertSuccess = () => {
    alert("🏆 Votre défaut a bien été enregistré ! 😀 🏆");
  };

  const regexTer = (value) => {
    return /^[0-9]{3,}/.test(value);
  };

  const verifyTerNumber = () => {
    if (regexTer(ter_number)) {
      return true;
    }
    alert("Veuillez indiquer le TER concerné");
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
    if (verifyDescription(description) && verifyTerNumber(ter_number)) {
      postDefaults(
        data,
        setTerNumber(0),
        setDescription(""),
        setPicture(""),
        setImage(null),
        alertSuccess(),
        nav()
      );
    }
  };

  return (
    <div className="ter-container">
      <Header
        backCss="backTer"
        profileCss="profileTer"
        loginCss="loginTer"
        adminOffCss="adminOffTer"
      />

      <form className="terField-container">
        <h1> TER </h1>

        <Input
          className="inputTer"
          onChange={(e) => setTerNumber(e.target.value)}
          value={ter_number}
          forId="ter"
          type="number"
          field="Numéro de Ter"
        />
        <Textarea
          className="textTer"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          forId="field"
          type="text"
        />

        <Input
          className="inputTer"
          onChange={(e) => setImage(e.target.files[0])}
          forId="file"
          type="file"
          accept=".png, .jpg, .jpeg, .gif"
          field="Joindre une photographie"
        />
        <Input type="button" onClick={handleUpload} field="télécharger" />

        <br />

        <img
          className={picture !== "" ? "pictureTerOn" : "pictureTerOff "}
          src={picture}
          alt="image"
        />

        <Input
          className="inputTer"
          forId="file"
          onChange={(e) => setLatitude(e.target.value)}
          type="text"
          value={latitude}
          field="Latitude"
        />
        <Input
          className="inputTer"
          forId="fileTwo"
          onChange={(e) => setLongitude(e.target.value)}
          type="text"
          value={longitude}
          field="Longitude"
        />
        <Button
          classButton="sendTer"
          onClick={(e) => handleSubmit(e)}
          fieldButton="ENVOYER"
          type="button"
        />
      </form>

      <Footer />
    </div>
  );
};

export default Ter;
