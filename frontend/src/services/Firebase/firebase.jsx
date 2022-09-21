import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// init Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB2wgJzItF_HnK8w9AUQTvMFC_hM44ho8o",
  authDomain: "infodefaut-806bc.firebaseapp.com",
  projectId: "infodefaut-806bc",
  storageBucket: "infodefaut-806bc.appspot.com",
  messagingSenderId: "133932224186",
  appId: "1:133932224186:web:4a9987c2bf38a0a09ebc83",
};
const app = initializeApp(firebaseConfig);

// ref à la base de Storage Firebase
export const storage = getStorage(app);

// export default { storage };
