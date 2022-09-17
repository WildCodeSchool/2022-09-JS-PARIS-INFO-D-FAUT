import React, { useContext } from "react";
import "./GareEtConnexions.css";
// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";

import {
  Footer,
  Header,
  Input,
  Button,
  Textarea,
} from "../../components/index";
import { Geolocalisation } from "../../services/Geolocalisation/Geolocalisation";
import { postDefaults } from "../../services/axios/AxiosDefaults";
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
  const { latitude, setLatitude } = useContext(LatitudeContext);
  const { longitude, setLongitude } = useContext(LongitudeContext);
  // const { id } = useParams();
  // const navigate = useNavigate();

  const id_user = 10;
  const data = {
    id_user,
    station,
    description,
    picture,
    longitude,
    latitude,
  };

  // const postDefaults = async () => {
  //   const id_user = 1;
  //   const data = {
  //     id_user,
  //     station,
  //     description,
  //     picture,
  //     longitude,
  //     latitude,
  //   };

  //   const response = await axios.post(`http://localhost:5000/defaults`, data);
  //   if (response.data.problem) {
  //     setProblem();
  //   }
  // };

  // const handleClick = () => {
  //   navigate("/defaultsUser");
  // };

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
          onClick={(e) => postDefaults(data, setProblem, e)}
          champButton="ENVOYER"
          type="button"
        />
      </form>
      {/* <Link to="/defaultsUser/">
        <Button
          classButton="envoyer"
          // onClick={handleClick}
          champButton="defaut envoyé"
          type="bouton"
        />
      </Link> */}

      <Footer />
    </div>
  );
};

export default GareEtConnexions;
