import React, { useState, useContext, useEffect } from "react";
import { getDownloadURL } from "firebase/storage";
import { uploadFile } from "../../services/Firebase/firebase";
import "./GareEtConnexions.css";
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
// import { PictureImport } from "../../components/PictureImport/PictureImport";

const GareEtConnexions = () => {
  const { cp } = useContext(CpUserContext);
  const { id_user } = useContext(IdUserContext);

  const [station, setStation] = useState("");
  // mettre en tableau pour voir la photo en mettant l'url
  const [description, setDescription] = useState("");
  // changer en varchar
  const [picture, setPicture] = useState([]);
  const { latitude, setLatitude } = useContext(LatitudeContext);
  const { longitude, setLongitude } = useContext(LongitudeContext);

  // const [imgURL, setImgURL] = useState("");

  const [image, setImage] = useState(null);
  // console.log(picture);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const result = await uploadFile(image);
      // console.log(result);
      setPicture(result);
    } catch (error) {
      console.error(error);
    }
  };

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

        {/* <PictureImport value={picture} /> */}
        <Input
          className="inputGare"
          onChange={(e) => setImage(e.target.files[0])}
          forId="file"
          type="file"
          accept=".png, .jpg, .jpeg, .gif"
          champ="Joindre une photographie"
        />
        <Input type="button" onClick={handleUpload} champ="télécharger" />

        <br />

        <a href={picture} target="_blank" rel="noreferrer">
          <img className="imgDefaults" src={picture} alt="image" />
        </a>

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
              setStation(""),
              setDescription(""),
              setPicture([]),
              setImage(null),
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

export default GareEtConnexions;
