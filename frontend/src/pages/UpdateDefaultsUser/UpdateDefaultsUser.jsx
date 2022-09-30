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
  GeolocationContext,
  UserContext,
  DefaultContext,
} from "../../context/index";

const UpdateDefaultsUser = () => {
  const { id_default } = useParams();
  const { user } = useContext(UserContext);
  const user_id = user.id_user;

  const { defaut } = useContext(DefaultContext);
  const stationDefault = defaut[0].station;
  const railwayDefault = defaut[0].railway_track_number;
  const terDefault = defaut[0].ter_number;
  const tgvDefault = defaut[0].tgv_number;
  const descriptionDefault = defaut[0].description;
  const pictureDefault = defaut[0].picture;

  const { geolocation } = useContext(GeolocationContext);
  const latitudeDefault = geolocation.latitude;
  const longitudeDefault = geolocation.longitude;

  const [problem, setProblem] = useState([]);

  const [station, setStation] = useState(stationDefault);
  const [railway_track_number, setRailwayNumber] = useState(railwayDefault);
  const [ter_number, setTerNumber] = useState(terDefault);
  const [tgv_number, setTgvNumber] = useState(tgvDefault);
  const [description, setDescription] = useState(descriptionDefault);
  const [picture, setPicture] = useState(pictureDefault);
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

  useEffect(() => {
    getUserDefaultById(id_default, setProblem);
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
          champ="Numéro de TER"
        />
        <Input
          className="inputVoyageurs"
          onChange={(e) => setTgvNumber(e.target.value)}
          value={tgv_number}
          forId="tgv"
          type="number"
          champ="Numéro du TGV"
        />
        <Textarea
          className="textGare"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          forId="field"
          type="text"
        />
        <img className="img-items" src={defaut[0].picture} alt="image" />
        <Input
          className="inputGare"
          onChange={(e) => setImage(e.target.files[0])}
          forId="file"
          type="file"
          accept=".png, .jpg, .jpeg, .gif"
          champ="Modifier la photo"
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
