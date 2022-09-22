import React, { useContext, useState } from "react";
import "./Voyageurs.css";
import { postDefaults } from "../../services/axios/AxiosDefaults";
import { Geolocalisation } from "../../services/Geolocalisation/Geolocalisation";
import {
  Footer,
  Header,
  Input,
  Button,
  Textarea,
} from "../../components/index";
import {
  IdUserContext,
  CpUserContext,
  LongitudeContext,
  LatitudeContext,
} from "../../context/index";

const Voyageurs = () => {
  const { id_user } = useContext(IdUserContext);
  const { cp_user } = useContext(CpUserContext);

  const [tgv_number, setTgvNumber] = useState(0);
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const { latitude, setLatitude } = useContext(LatitudeContext);
  const { longitude, setLongitude } = useContext(LongitudeContext);

  const data = {
    id_user,
    tgv_number,
    description,
    picture,
    longitude,
    latitude,
  };

  return (
    <div className="voyageurs-container">
      {Geolocalisation()}
      <Header backCss="backVoyageurs" profileCss="profileVoyageurs" />
      <form className="voyageurs_champ-container">
        <h1>GARE & CONNEXIONS</h1>
        {/* <Input
          className="inputVoyageurs"
          forId="cp"
          type="text"
          champ="Numéro de CP"
          minlength={8}
          maxlength={8}
        /> */}
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
          className="inputVoyageurs"
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
          onClick={(e) =>
            postDefaults(data, setTgvNumber(0), setDescription(""), e)
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
