// import React from "react";
// import { storage } from "../../services/firebase";

// export const PictureForm = () => {
//   // upload pictures
//   const pictureHandler = (e) => {
//     e.preventDefault();
//     const file = e.target[0].files[0];
//     uploadFiles(file);
//   };

//   const uploadFiles = (file) => {
//     const uploadTask = storage.ref(`files/${file.name}`).put(file);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         //
//       },
//       (err) => console.warn(err),
//       () => {
//         storage
//           .ref("files")
//           .child(file.name)
//           .getDownloadURL()
//           .then((url) => {
//             console.log(url);
//           });
//       }
//     );
//   };

//   return (
//     <div className="PictureForm">
//       <form onSubmit={pictureHandler}>
//         <input type="file" className="input" />
//         <button type="submit">Télécharger</button>
//       </form>
//     </div>
//   );
// };
