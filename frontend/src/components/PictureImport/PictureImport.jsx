import { React, useState, Alert } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../services/Firebase/firebase";
import "./PictureImport.css";

export const PictureImport = () => {
  // state du téléchargement
  const [file, setFile] = useState("");

  // state de la progression du chargement
  const [percentages, setPercentages] = useState(0);

  // Gestion de l'événement de téléchargement de fichier et de l'état de mise à jour
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      Alert("Choisir un fichier d'abord !");
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
          console.warn(url);
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
      <button className="Pictures" onClick={handleUpload}>
        Télécharger
      </button>
      <div className="Percentages">
        <h3>{percentages} % effectués</h3>
      </div>
    </div>
  );
};
