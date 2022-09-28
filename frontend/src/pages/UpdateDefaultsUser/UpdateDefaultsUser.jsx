import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { uploadFile } from "../../services/Firebase/firebase";
import "./UpdateDefaultsUser.css";
import {
  updateDefaults,
  getUserDefaultById,
} from "../../services/axios/AxiosDefaults";
import { Geolocalisation } from "../../services/Geolocalisation/Geolocalisation";
import {
  Input,
  Button,
  Textarea,
  Footer,
  Header,
} from "../../components/index";
import {
  IdUserContext,
  LongitudeContext,
  LatitudeContext,
} from "../../context/index";

const UpdateDefaultsUser = () => {
  const { id_default } = useParams();
  const { id_user } = useContext(IdUserContext);
  const user_id = id_user;
  const [problem, setProblem] = useState([]);

  const [station, setStation] = useState("");

  const [railway_track_number, setRailwayNumber] = useState(0);
  const [ter_number, setTerNumber] = useState(0);
  const [tgv_number, setTgvNumber] = useState(0);
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const { latitude, setLatitude } = useContext(LatitudeContext);
  const { longitude, setLongitude } = useContext(LongitudeContext);

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

  useEffect(() => {
    getUserDefaultById(
      id_default,
      setProblem,
      setStation,
      setRailwayNumber,
      setTerNumber,
      setTgvNumber,
      setDescription,
      setPicture
    );
  }, []);

  const data = {
    user_id,
    station,
    railway_track_number,
    ter_number,
    tgv_number,
    description,
    picture,
    longitude,
    latitude,
  };

  return (
    <div className="updateDefaultsUser-container">
      {Geolocalisation()}
      <Header
        backCss="backUpdateDefaultsUser"
        profileCss="profileUpdateDefaultsUser"
      />
      <form className="gare_champ-container">
        <h1>MODIFICATION</h1>
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
          value={railway_track_number}
          forId="ligne"
          type="number"
          champ="Numéro de ligne / Emprise"
        />
        <Input
          className="inputTer"
          onChange={(e) => setTerNumber(e.target.value)}
          value={ter_number}
          forId="ter"
          type="number"
          champ="Numéro de Ter"
        />
        <Input
          className="inputVoyageurs"
          onChange={(e) => setTgvNumber(e.target.value)}
          value={tgv_number}
          forId="tgv"
          type="number"
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
          onChange={(e) => setImage(e.target.files[0])}
          forId="file"
          type="file"
          accept=".png, .jpg, .jpeg, .gif"
          champ="Joindre une photographie"
        />
        <Input type="button" onClick={handleUpload} champ="télécharger" />
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
            updateDefaults(
              id_default,
              data,
              setProblem,
              setStation,
              setRailwayNumber,
              setTerNumber,
              setTgvNumber,
              setDescription,
              setPicture,
              setImage,
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

export default UpdateDefaultsUser;
