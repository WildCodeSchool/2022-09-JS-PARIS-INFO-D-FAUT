import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../../services/Firebase/firebase";
import "./Voyageurs.css";
import { postDefaults } from "../../services/axios/AxiosDefaults";
import {
  Footer,
  Header,
  Input,
  Button,
  Textarea,
} from "../../components/index";
import { GeolocationContext, UserContext } from "../../context/index";

const Voyageurs = () => {
  const { user } = useContext(UserContext);
  const cp = user.cp;
  const user_id = user.id_user;
  const navigate = useNavigate();

  const { geolocation } = useContext(GeolocationContext);
  const latitudeDefault = geolocation.latitude;
  const longitudeDefault = geolocation.longitude;

  const [tgv_number, setTgvNumber] = useState(0);
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [latitude, setLatitude] = useState(latitudeDefault);
  const [longitude, setLongitude] = useState(longitudeDefault);

  const [image, setImage] = useState(null);

  const [tgvRegex, setTgvRegex] = useState(true);
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
    tgv_number,
    description,
    picture,
    longitude,
    latitude,
  };

  const regexTgv = (value) => {
    return /^[0-9]{3,}/.test(value);
  };

  const verifyTgvNumber = () => {
    if (regexTgv(tgv_number)) {
      setTgvRegex(true);
      return true;
    }
    setTgvRegex(false);
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
    if (verifyTgvNumber(tgv_number) && verifyDescription(description)) {
      postDefaults(data);
      setTgvNumber(0);
      setDescription("");
      setPicture("");
      setImage(null);
      alertSuccess();
      duration();
    }
  };

  return (
    <div className="voyageurs-container">
      <Header
        backCss="backVoyageurs"
        profileCss="profileVoyageurs"
        loginCss="loginVoyageurs"
        adminOffCss="adminOffVoyageurs"
      />

      <form className="voyageursField-container">
        <h1>TGV</h1>
        <Input
          className="inputVoyageurs"
          onChange={(e) => setTgvNumber(e.target.value)}
          value={tgv_number}
          forId="tgv"
          type="number"
          field="Numéro du Tgv *"
        />
        <p className="fieldFalse">
          {tgvRegex === false ? "Veuillez indiquer le TGV concerné" : ""}
        </p>

        <Textarea
          className="textVoyageurs"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          forId="field"
          type="text"
        />
        <p className="fieldFalse">
          {descriptionRegex === false ? "Veuillez décrire le défaut" : ""}
        </p>

        <Input
          className="inputVoyageursImg"
          onChange={(e) => setImage(e.target.files[0])}
          forId="file"
          type="file"
          accept=".png, .jpg, .jpeg, .gif"
          field="Joindre une photographie"
        />
        <Button
          classButton="voyageursUpload"
          type="button"
          name="button"
          onClick={handleUpload}
          fieldButton="Télécharger"
        />

        <br />

        <img
          className={picture !== "" ? "pictureTgvOn" : "pictureTgvOff "}
          src={picture}
          alt="image"
        />

        <Input
          className="inputVoyageurs"
          forId="file"
          onChange={(e) => setLatitude(e.target.value)}
          type="text"
          value={latitude}
          field="Latitude"
        />
        <Input
          className="inputVoyageurs"
          forId="file2"
          onChange={(e) => setLongitude(e.target.value)}
          type="text"
          value={longitude}
          field="Longitude"
        />

        <Button
          classButton="sendVoyageurs"
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

export default Voyageurs;
