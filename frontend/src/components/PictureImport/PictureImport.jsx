import { React, useState, useContext, Alert } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Popup from "reactjs-popup";
import { storage } from "../../services/Firebase/firebase";
import { PictureContext } from "../../context/PictureContext";
// import Popup from "reactjs-popup";
import "./PictureImport.css";

const popup = () => {
  <Popup trigger={<button>Trigger</button>} position="right center">
    <div>Choisir une photo !</div>
  </Popup>;
};

export const PictureImport = () => {
  // récupération de l'url de la photo postée.
  const { setPicture } = useContext(PictureContext);
  // state du téléchargement
  const [file, setFile] = useState("");

  // state de la progression du chargement
  const [percentages, setPercentages] = useState(0);

  // Gestion de l'événement de téléchargement de fichier et de l'état de mise à jour
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  // const noFileAlert = () =>
  //   Alert.alert("Alerte !", "Choisir un fichier d'abord !");

  const handleUpload = (e) => {
    e.preventDefault();

    if (!file) {
      popup();
      // Alert("No file", "Choisir un fichier d'abord !");
    }

    const storageRef = ref(storage, `/defaults/${file.name}`);

    // la progression peut être interrompue et reprise. Il expose également la progression des mises à jour.
    // Reçoit la référence de stockage et le fichier à uploader.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const NewPercentages = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // progression de l'update
        setPercentages(NewPercentages);
      },
      (err) => console.warn(err),
      () => {
        // téléchargement de l'URL
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.warn("url", url);
          setPicture("url", url);
        });
      }
    );
  };

  return (
    <div className="pictureImport">
      <div className="pictureInput">
        <input
          type="file"
          id="imageFile"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
      <button className="Pictures" onClick={(e) => handleUpload(e)}>
        Télécharger
      </button>
      <div className="Percentages">
        <h3>{percentages} % effectués</h3>
      </div>
    </div>
  );
};
