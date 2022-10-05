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
    navigate(`/items/${cp}`);
  };

  const data = {
    user_id,
    ter_number,
    description,
    picture,
    longitude,
    latitude,
  };

  const alertSucess = () => {
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
        alertSucess(),
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
        admin0Css="admin0Ter"
      />

      <form className="ter_champ-container">
        <h1> TER </h1>

        <Input
          className="inputTer"
          onChange={(e) => setTerNumber(e.target.value)}
          value={ter_number}
          forId="ter"
          type="number"
          champ="Numéro de Ter"
        />
        <Textarea
          className="textTer"
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

        <a href={picture} target="_blank" rel="noreferrer">
          <img className="imgDefaults" src={picture} alt="image" />
        </a>

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

export default Ter;
