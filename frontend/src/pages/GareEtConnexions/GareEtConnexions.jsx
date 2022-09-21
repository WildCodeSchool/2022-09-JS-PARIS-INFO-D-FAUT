import React, { useState, useContext } from "react";
import "./GareEtConnexions.css";
import { Link } from "react-router-dom";
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

const GareEtConnexions = () => {
  const { cp_user } = useContext(CpUserContext);
  const { id_user } = useContext(IdUserContext);

  const [station, setStation] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const { latitude, setLatitude } = useContext(LatitudeContext);
  const { longitude, setLongitude } = useContext(LongitudeContext);

  const data = {
    id_user,
    station,
    description,
    picture,
    longitude,
    latitude,
  };

  return (
    <div className="gare-container">
      {Geolocalisation()}
      <Header backCss="backGare" profileCss="profileGare" />

      <form className="gare_champ-container">
        <h1>GARE & CONNEXIONS</h1>
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
          onClick={(e) =>
            postDefaults(data, setStation(""), setDescription(""), e)
          }
          champButton="ENVOYER"
          type="button"
        />
      </form>

      <Link to={`/defaultsUser/${cp_user}`}>
        <Button
          classButton="envoyer"
          champButton="defaut envoyé"
          type="bouton"
        />
      </Link>

      <Footer />
    </div>
  );
};

export default GareEtConnexions;
