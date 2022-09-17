import React, { useState, useContext } from "react";
import "./UpdateDefaultsUser.css";
import { useParams } from "react-router-dom";
import { updateDefaults } from "../../services/axios/AxiosDefaults";
import { Geolocalisation } from "../../services/Geolocalisation/Geolocalisation";
import {
  Footer,
  Header,
  Input,
  Button,
  Textarea,
} from "../../components/index";
import {
  ProfileContext,
  LongitudeContext,
  LatitudeContext,
} from "../../context/index";

const UpdateDefaultsUser = () => {
  const { id_default } = useParams();
  const { id_user } = useContext(ProfileContext);

  const [problem, setProblem] = useState("");
  const [station, setStation] = useState("");
  const [railwayNumber, setRailwayNumber] = useState("");
  const [terNumber, setTerNumber] = useState("");
  const [tgvNumber, setTgvNumber] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const { latitude, setLatitude } = useContext(LatitudeContext);
  const { longitude, setLongitude } = useContext(LongitudeContext);

  const data = {
    id_user,
    station,
    railwayNumber,
    terNumber,
    tgvNumber,
    description,
    picture,
    longitude,
    latitude,
  };

  return (
    <div className="update-container">
      {Geolocalisation()}
      <Header backCss="backGare" profileCss="profileGare" />

      <form className="gare_champ-container">
        <h1>MODIFICATION</h1>
        {/* <Input
          className="inputGare"
          forId="cp"
          type="text"
          champ="Numéro de CP"
          minlength={8}
          maxlength={8}
        /> */}
        <Input
          className="inputGare"
          onChange={(e) => setStation(e.target.value)}
          value={station}
          forId="gare"
          type="text"
          champ="Gare concernée"
        />
        <Input
          className="inputReseau"
          onChange={(e) => setRailwayNumber(e.target.value)}
          value={railwayNumber}
          forId="ligne"
          type="text"
          champ="Numéro de ligne / Emprise"
        />
        <Input
          className="inputTer"
          onChange={(e) => setTerNumber(e.target.value)}
          value={terNumber}
          forId="ter"
          type="text"
          champ="Numéro de Ter"
        />
        <Input
          className="inputVoyageurs"
          onChange={(e) => setTgvNumber(e.target.value)}
          value={tgvNumber}
          forId="tgv"
          type="text"
          champ="Numéro du train"
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
          onChange={(e) => setPicture(e.target.value)}
          value={picture}
          forId="file"
          type="file"
          champ="Joindre une photographie"
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
          onClick={(e) => updateDefaults(id_default, data, setProblem, e)}
          champButton="ENVOYER"
          type="button"
        />
      </form>

      <Footer />
    </div>
  );
};

export default UpdateDefaultsUser;
