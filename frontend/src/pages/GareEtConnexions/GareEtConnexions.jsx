import React, { useContext } from "react";
import "./GareEtConnexions.css";
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
  StationContext,
  DescriptionContext,
  PictureContext,
  LongitudeContext,
  LatitudeContext,
} from "../../context/index";

const GareEtConnexions = () => {
  const { setProblem } = useContext(DefaultsContext);
  const { station, setStation } = useContext(StationContext);
  const { description, setDescription } = useContext(DescriptionContext);
  const { picture, setPicture } = useContext(PictureContext);
  const { id } = useParams();
  // const [tgv_number, setTgv_number] = useState("");
  // const [ter_number, setTer_number] = useState("");
  // const [railway_track_number, setRailway_track_number] = useState("");

  const postDefaults = async () => {
    const id_user = id;
    const data = {
      id_user,
      station,
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
        />
      </form>

      <Footer />
    </div>
  );
};

export default GareEtConnexions;
