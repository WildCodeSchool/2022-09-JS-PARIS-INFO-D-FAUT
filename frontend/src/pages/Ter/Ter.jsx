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

  const [terRegex, setTerRegex] = useState(true);
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
    ter_number,
    description,
    picture,
    longitude,
    latitude,
  };

  const regexTer = (value) => {
    return /^[0-9]{3,}/.test(value);
  };

  const verifyTerNumber = () => {
    if (regexTer(ter_number)) {
      setTerRegex(true);
      return true;
    }
    setTerRegex(false);
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
    if (verifyTerNumber(ter_number) && verifyDescription(description)) {
      postDefaults(data);
      setTerNumber(0);
      setDescription("");
      setPicture("");
      setImage(null);
      alertSuccess();
      duration();
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
          field="Numéro de Ter *"
        />
        <p className="fieldFalse">
          {terRegex === false ? "Veuillez indiquer le TER concerné" : ""}
        </p>

        <Textarea
          className="textTer"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          forId="field"
          type="text"
        />
        <p className="fieldFalse">
          {descriptionRegex === false ? "Veuillez décrire le défaut" : ""}
        </p>

        <Input
          className="inputTerImg"
          onChange={(e) => setImage(e.target.files[0])}
          forId="file"
          type="file"
          accept=".png, .jpg, .jpeg, .gif"
          field="Joindre une photographie"
        />
        <Button
          classButton="terUpload"
          type="button"
          name="button"
          onClick={handleUpload}
          fieldButton="Télécharger"
        />
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

export default Ter;
