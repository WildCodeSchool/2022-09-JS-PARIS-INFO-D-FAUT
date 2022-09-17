import React, { useContext, useState } from "react";
import "./Voyageurs.css";
// import { useParams } from "react-router-dom";
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
  ProfileContext,
  // DefaultsContext,
  // TgvNumberContext,
  // DescriptionContext,
  // PictureContext,
  LongitudeContext,
  LatitudeContext,
} from "../../context/index";

const Voyageurs = () => {
  const { id_user } = useContext(ProfileContext);

  const [problem, setProblem] = useState("");

  const [tgvNumber, setTgvNumber] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const { latitude, setLatitude } = useContext(LatitudeContext);
  const { longitude, setLongitude } = useContext(LongitudeContext);
  // const { id } = useParams();

  const data = {
    id_user,
    tgvNumber,
    description,
    picture,
    longitude,
    latitude,
  };

  // const postDefaults = async () => {
  //   const id_user = id;
  //   const data = {
  //     id_user,
  //     tgvNumber,
  //     description,
  //     picture,
  //     longitude,
  //     latitude,
  //   };

  //   const response = await axios.post("http://localhost:5000/defaults", data);
  //   if (response.data.problem) {
  //     setProblem();
  //   }
  // };

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
          value={tgvNumber}
          forId="tgv"
          type="text"
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
            postDefaults(
              data,
              setProblem,
              setTgvNumber,
              setDescription,
              setPicture,
              e
            )
          }
          champButton="ENVOYER"
          type="button"
        />
      </form>
      <Link to={`/defaultsUser/${id_user}`}>
        <Button
          classButton="envoyer"
          // onClick={handleClick}
          champButton="defaut envoyé"
          type="bouton"
        />
      </Link>

      <Footer />
    </div>
  );
};

export default Voyageurs;
