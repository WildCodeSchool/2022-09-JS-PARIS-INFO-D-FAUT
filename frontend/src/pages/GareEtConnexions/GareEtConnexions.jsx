import React, { useContext, useState } from "react";
import "./GareEtConnexions.css";
import axios from "axios";
import {
  Footer,
  Header,
  Input,
  Button,
  Textarea,
} from "../../components/index";
import { Geolocalisation } from "../../utils/Geolocalisation/Geolocalisation";
import { LongitudeContext } from "../../context/LongitudeContext";
import { LatitudeContext } from "../../context/LatitudeContext";
import { DefaultsContext } from "../../context/DefaultsContext";

const GareEtConnexions = () => {
  const { latitude } = useContext(LatitudeContext);
  const { longitude } = useContext(LongitudeContext);
  const { setProblem } = useContext(DefaultsContext);

  const [description, setDescription] = useState("");

  const postDefaults = async () => {
    const id_user = 1;
    const data = { id_user, description };

    const response = await axios.post("http://localhost:5000/defaults", data);
    if (response.data.problem) {
      setProblem();
    }
  };

  return (
    <div className="gare-container">
      <Header backCss="backGare" profileCss="profileGare" />

      <form className="gare_champ-container">
        <h1>GARE & CONNEXIONS</h1>
        <Input
          className="inputGare"
          forId="cp"
          type="text"
          champ="Numéro de CP"
          minlength={8}
          maxlength={8}
        />
        <Input
          className="inputGare"
          forId="gare"
          type="text"
          champ="Gare concernée"
        />
        {/* <Input className="inputAnomalie" forId="anomalie" type="text" champ="Description de l'anomalie" /> */}
        <Textarea
          className="textGare"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          forId="field"
          type="text"
        />
        <Input
          className="inputGare"
          forId="file"
          type="file"
          champ="Joindre une photographie"
        />
        <Input
          className="inputGare"
          forId="file"
          onChange={Geolocalisation()}
          type="text"
          // placeholder={`  ${latitude},  ${longitude}`}
          // defaultValue={`  ${latitude},  ${longitude}`}
          value={`  ${latitude},  ${longitude}`}
          champ="Coordonnées GPS"
        />

        {/* <div>
          <h2>Coordonnées GPS</h2>
          <h3>{Geolocalisation()}</h3>
        </div> */}

        <Button
          classButton="envoyer"
          onClick={postDefaults}
          champButton="ENVOYER"
          type="button"
        />
      </form>

      <Footer />
    </div>
  );
};

export default GareEtConnexions;
