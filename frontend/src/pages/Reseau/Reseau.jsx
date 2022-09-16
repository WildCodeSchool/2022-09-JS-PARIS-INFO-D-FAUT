import React, { useContext } from "react";
import "./Reseau.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Footer,
  Header,
  Input,
  Button,
  Textarea,
} from "../../components/index";
import { Geolocalisation } from "../../utils/Geolocalisation/Geolocalisation";
import {
  DefaultsContext,
  RailwayTrackNumberContext,
  DescriptionContext,
  PictureContext,
  LongitudeContext,
  LatitudeContext,
} from "../../context/index";

const Reseau = () => {
  const { setProblem } = useContext(DefaultsContext);
  const { railwayNumber, setRailwayNumber } = useContext(
    RailwayTrackNumberContext
  );
  const { description, setDescription } = useContext(DescriptionContext);
  const { picture, setPicture } = useContext(PictureContext);
  const { latitude, setLatitude } = useContext(LatitudeContext);
  const { longitude, setLongitude } = useContext(LongitudeContext);
  const { id } = useParams();

  const postDefaults = async () => {
    const id_user = id;
    const data = {
      id_user,
      railwayNumber,
      description,
      picture,
      longitude,
      latitude,
    };

    const response = await axios.post("http://localhost:5000/defaults", data);
    if (response.data.problem) {
      setProblem();
    }
  };

  return (
    <div className="reseau-container">
      {Geolocalisation()}
      <Header backCss="backReseau" profileCss="profileReseau" />

      <form className="reseau_champ-container">
        <h1>RESEAU</h1>
        {/* <Input
          className="inputReseau"
          forId="cp"
          type="text"
          champ="Numéro de CP"
          minlength={8}
          maxlength={8}
        /> */}
        <Input
          className="inputReseau"
          onChange={(e) => setRailwayNumber(e.target.value)}
          value={railwayNumber}
          forId="ligne"
          type="text"
          champ="Numéro de ligne / Emprise"
        />
        <Textarea
          className="textReseau"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          forId="field"
          type="text"
        />
        <Input
          className="inputReseau"
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
          onClick={postDefaults}
          champButton="ENVOYER"
          type="button"
        />{" "}
      </form>

      <Footer />
    </div>
  );
};

export default Reseau;
