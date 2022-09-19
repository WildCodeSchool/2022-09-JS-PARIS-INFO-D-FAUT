import { React, useState } from "react";
// import firebase from "firebase/app";
import { storage } from "../../services/Firebase/firebase";

export const PictureForm = () => {
  // upload pictures

  const uploadFiles = (file) => {
    const [setProgress] = useState(0);

    const uploadTask = storage.ref(`files/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.warn(err),
      () => {
        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            // console.log(url);
          });
      }
    );
  };
  // placée à la base juste en dessous de la fonction
  const pictureHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  return (
    <div className="PictureForm">
      <form onSubmit={pictureHandler}>
        <input type="file" className="input" />
        <button type="submit">Télécharger</button>
      </form>
      {/* <h2>Chargement {prog}%</h2> */}
    </div>
  );
};
