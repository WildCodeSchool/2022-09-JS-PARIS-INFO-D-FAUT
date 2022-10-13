import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../../services/Firebase/firebase";
import "./Voyageurs.css";
import { postDefaults } from "../../services/axios/AxiosDefaults";
import {
  Footer,
  Header,
  Input,
  Button,
  Textarea,
} from "../../components/index";
import { GeolocationContext, UserContext } from "../../context/index";

const Voyageurs = () => {
  const { user } = useContext(UserContext);
  const cp = user.cp;
  const user_id = user.id_user;
  const navigate = useNavigate();

  const { geolocation } = useContext(GeolocationContext);
  const latitudeDefault = geolocation.latitude;
  const longitudeDefault = geolocation.longitude;

  const [tgv_number, setTgvNumber] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [latitude, setLatitude] = useState(latitudeDefault);
  const [longitude, setLongitude] = useState(longitudeDefault);

  const [image, setImage] = useState(null);

  const [tgvRegex, setTgvRegex] = useState(true);
  const [descriptionRegex, setDescriptionRegex] = useState(true);
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
    navigate(`/home/${cp}`);
  };
  const [zoom, setZoom] = useState(false);
  const handleClickOpen = () => {
    setZoom(!zoom);
  };
  const onKeyPressHandler = () => {
    setZoom(false);
  };
  const closePopup = () => {
    setZoom(false);
  };

  const data = {
    user_id,
    tgv_number,
    description,
    picture,
    longitude,
    latitude,
  };

  const regexTgv = (value) => {
    return /^[0-9]{3,}/.test(value);
  };

  const verifyTgvNumber = () => {
    if (regexTgv(tgv_number)) {
      setTgvRegex(true);
      return true;
    }
    setTgvRegex(false);
    return false;
  };

  const verifyDescription = () => {
    if (description !== "") {
      setDescriptionRegex(true);
      return true;
    }
    setDescriptionRegex(false);
    return false;
  };

  const alertSuccess = () => {
    setSuccess(true);
  };

  const duration = () => {
    setTimeout(nav, 1000);
  };
  const handleSubmit = () => {
    if (verifyTgvNumber(tgv_number) && verifyDescription(description)) {
      postDefaults(data);
      setImage(null);
      alertSuccess();
      duration();
    }
  };

  return (
    <div className="voyageurs-container">
      <Header
        profileCss="profileVoyageurs"
        loginCss="loginVoyageurs"
        adminOffCss="adminOffVoyageurs"
        logoutCss="logoutVoyageurs"
      />

      <form className="voyageursField-container">
        <h1 className="h1Animation">TGV</h1>
        <div className="inputVoyageurOne">
          <Input
            className="inputVoyageurs"
            onChange={(e) => setTgvNumber(e.target.value)}
            value={tgv_number}
            forId="tgv"
            type="number"
            field="Numéro du train *"
          />
          <p className="fieldFalse">
            {tgvRegex === false ? "Veuillez indiquer le TGV concerné" : ""}
          </p>
        </div>
        <div className="inputVoyageurTwo">
          <Textarea
            className="textVoyageurs"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            forId="field"
            type="text"
          />
          <p className="fieldFalse">
            {descriptionRegex === false ? "Veuillez décrire le défaut" : ""}
          </p>
        </div>
        <div className="inputVoyageurThree">
          <Input
            className="inputVoyageursImg"
            onChange={(e) => setImage(e.target.files[0])}
            forId="file"
            type="file"
            accept=".png, .jpg, .jpeg, .gif"
            field="Joindre une photographie"
          />
        </div>
        <div className="inputVoyageurFour">
          <Button
            classButton="voyageursUpload"
            type="button"
            name="button"
            onClick={handleUpload}
            fieldButton="Télécharger"
          />
        </div>
        <div className="pictureDefault">
          <img
            className={picture !== "" ? "pictureTgvOn" : "pictureTgvOff "}
            src={picture}
            alt="image"
            onClick={handleClickOpen}
            onKeyPress={onKeyPressHandler}
            role="presentation"
          />
        </div>
        <div className="latitudeLongitude">
          <Input
            className="inputLatitudeLongitude"
            forId="file"
            onChange={(e) => setLatitude(e.target.value)}
            type="text"
            value={latitude}
            field="Latitude"
          />
          <Input
            className="inputLatitudeLongitude"
            forId="file2"
            onChange={(e) => setLongitude(e.target.value)}
            type="text"
            value={longitude}
            field="Longitude"
          />
        </div>
        <div className="inputVoyageurFive">
          <Button
            classButton="sendVoyageurs"
            onClick={(e) => handleSubmit(e)}
            fieldButton="ENVOYER"
            type="button"
          />
          <p className="fieldFalse">
            {success === true
              ? "🏆 Votre défaut a bien été enregistré ! 😀 🏆"
              : ""}
          </p>
        </div>
        <div className="line" />
        <div>
          {zoom ? (
            <div className="popup">
              <div className="popUpHeader">
                <h5
                  className="h5PopUpHeader"
                  onClick={closePopup}
                  onKeyPress={onKeyPressHandler}
                  role="presentation"
                >
                  ✖️
                </h5>
              </div>
              <div className="popupBody">
                <img className="picturePopup" src={picture} alt="image" />
              </div>
              <div className="popUpfooter"> </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Voyageurs;
