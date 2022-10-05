import React, { useContext, useState } from "react";
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

  const { geolocation } = useContext(GeolocationContext);
  const latitudeDefault = geolocation.latitude;
  const longitudeDefault = geolocation.longitude;

  const [tgv_number, setTgvNumber] = useState(0);
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

  const data = {
    user_id,
    tgv_number,
    description,
    picture,
    longitude,
    latitude,
  };

  const alertSucess = () => {
    alert("🏆 Votre défaut a bien été enregistré ! 😀 🏆");
  };

  return (
    <div className="voyageurs-container">
      <Header
        backCss="backVoyageurs"
        profileCss="profileVoyageurs"
        loginCss="loginVoyageurs"
        admin0Css="admin0Voyageurs"
      />

      <form className="voyageurs_champ-container">
        <h1>GARE & CONNEXIONS</h1>
        <Input
          className="inputVoyageurs"
          onChange={(e) => setTgvNumber(e.target.value)}
          value={tgv_number}
          forId="tgv"
          type="number"
          champ="Numéro du train"
        />
        <Textarea
          className="textVoyageurs"
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
          onClick={(e) =>
            postDefaults(
              data,
              setTgvNumber(0),
              setDescription(""),
              setPicture(""),
              setImage(null),
              alertSucess(),
              e
            )
          }
          champButton="ENVOYER"
          type="button"
        />
      </form>

      <Footer />
    </div>
  );
};

export default Voyageurs;
