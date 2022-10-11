import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { uploadFile } from "../../services/Firebase/firebase";
import "./UpdateDefaultUser.css";
import { updateDefault } from "../../services/axios/AxiosDefaults";
import {
  Input,
  Button,
  Textarea,
  Footer,
  Header,
} from "../../components/index";
import { UserContext, DefaultContext } from "../../context/index";

const UpdateDefaultUser = () => {
  const navigate = useNavigate();
  const { id_default } = useParams();
  const { user } = useContext(UserContext);
  const cp = user.cp;
  const user_id = user.id_user;

  const { defaut } = useContext(DefaultContext);
  const stationDefault = defaut[0].station;
  const railwayDefault = defaut[0].railway_track_number;
  const terDefault = defaut[0].ter_number;
  const tgvDefault = defaut[0].tgv_number;
  const descriptionDefault = defaut[0].description;
  const pictureDefault = defaut[0].picture;
  const treatment = defaut[0].treatment;
  const latitudeDefault = defaut[0].latitude;
  const longitudeDefault = defaut[0].longitude;

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

  const [success, setSuccess] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const result = await uploadFile(image);
      setPicture(result);
    } catch (error) {
      console.error(error);
    }
  };
  const nav = () => {
    navigate(`/defaultsUser/${cp}`);
  };

  const alertSuccess = () => {
    setSuccess(true);
  };

  const duration = () => {
    setTimeout(nav, 3000);
  };

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
    treatment,
  };

  return (
    <div className="updateDefaultUser-container">
      <Header
        backCss="backUpdateDefaultUser"
        profileCss="profileUpdateDefaultUser"
        loginCss="loginUpdateDefaultUser"
        adminOffCss="adminOffUpdateDefaultUser"
      />
      <form className="updateDefaultUser_field-container">
        <h1>MODIFICATION</h1>
        <Input
          labelCss={station === null ? "stationUpdateOff" : "stationUpdateOn"}
          className={station === null ? "stationUpdateOff" : "stationUpdateOn"}
          onChange={(e) => setStation(e.target.value)}
          value={station}
          forId="gare"
          type="text"
          field="Gare concernée *"
        />
        <Input
          labelCss={
            railway_track_number === null ? "trackUpdateOff" : "trackUpdateOn"
          }
          className={
            railway_track_number === null ? "trackUpdateOff" : "trackUpdateOn"
          }
          onChange={(e) => setRailwayNumber(e.target.value)}
          value={railway_track_number}
          forId="ligne"
          type="number"
          field="Numéro de ligne / Emprise *"
        />
        <Input
          labelCss={ter_number === null ? "terUpdateOff" : "terUpdateOn"}
          className={ter_number === null ? "terUpdateOff" : "terUpdateOn"}
          onChange={(e) => setTerNumber(e.target.value)}
          value={ter_number}
          forId="ter"
          type="number"
          field="Numéro de TER *"
        />
        <Input
          labelCss={tgv_number === null ? "tgvUpdateOff" : "tgvUpdateOn"}
          className={tgv_number === null ? "tgvUpdateOff" : "tgvUpdateOn"}
          onChange={(e) => setTgvNumber(e.target.value)}
          value={tgv_number}
          forId="tgv"
          type="number"
          field="Numéro du TGV *"
        />
        <Textarea
          className="textUpdateDescription"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          forId="field"
          type="text"
        />
        <img
          className={picture === "" ? "pictureUpdateOff" : "pictureUpdateOn"}
          src={image === null ? defaut[0].picture : picture}
          alt="image"
        />
        <Input
          className="inputUpdateImage"
          onChange={(e) => setImage(e.target.files[0])}
          forId="file"
          type="file"
          accept=".png, .jpg, .jpeg, .gif"
          field="Modifier la photo"
        />
        <Button
          classButton="updateImgUpload"
          type="button"
          name="button"
          onClick={handleUpload}
          fieldButton="Télécharger"
        />
        <Input
          labelCss={
            latitude === null ? "latitudeUpdateOff" : "latitudeUpdateOn"
          }
          className={
            latitude === null ? "latitudeUpdateOff" : "latitudeUpdateOn"
          }
          forId="file"
          onChange={(e) => setLatitude(e.target.value)}
          type="text"
          value={latitude}
          field="Latitude"
        />
        <Input
          labelCss={
            longitude === null ? "longitudeUpdateOff" : "longitudeUpdateOn"
          }
          className={
            longitude === null ? "longitudeUpdateOff" : "longitudeUpdateOn"
          }
          forId="fileTwo"
          onChange={(e) => setLongitude(e.target.value)}
          type="text"
          value={longitude}
          field="Longitude"
        />
        <Button
          classButton="sendUpdateUser"
          onClick={(e) =>
            updateDefault(
              id_default,
              data,
              setStation("gare :"),
              setRailwayNumber(0),
              setTerNumber(0),
              setTgvNumber(0),
              setDescription("Description"),
              setPicture(""),
              setImage(null),
              alertSuccess(),
              duration(),
              e
            )
          }
          fieldButton="ENVOYER"
          type="button"
        />
        <p className="fieldFalse">
          {success === true ? "🏆 Votre défaut a bien été modifié ! 😀 🏆" : ""}
        </p>
      </form>
      <Footer />
    </div>
  );
};

export default UpdateDefaultUser;
