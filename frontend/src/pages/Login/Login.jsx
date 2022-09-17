import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ProfileContext } from "../../context/index";
import { Header, Footer, Input, Button } from "../../components/index";
import "./Login.css";
import Home from "../Home/Home";

const Login = () => {
  const { setProfile } = useContext(ProfileContext);

  const [cp, setCp] = useState("");
  const [password, setPassword] = useState("");
  const [sucess, setSucess] = useState(false);

  // const postUser = async () => {
  //   const data = {
  //     cp,
  //     password,
  //   };

  //   const response = await axios.post(
  //     `http://localhost:5000/profile/login`,
  //     data
  //   );
  //   if (response.data.profile) {
  //     setProfile();
  //   }
  // };

  const postUser = async (e) => {
    e.preventDefault();

    const data = {
      cp,
      password,
    };

    const response = await axios.post(
      `http://localhost:5000/profile/login`,
      data
    );
    if (response.data.profile) {
      setProfile();
    }
    setCp("");
    setPassword("");
    setSucess(true);
  };

  return (
    <div>
      {sucess ? (
        <div>
          <Home />
        </div>
      ) : (
        <div className="utilisateur-container">
          <Header backCss="backUtilisateur" profileCss="profileUtilisateur" />
          <div className="champ-container">
            <form className="form-container">
              <h1>UTILISATEUR</h1>
              <Input
                className="inputUtilisateur"
                forId="cp"
                type="text"
                champ="Numéro de CP"
                onChange={(e) => setCp(e.target.value)}
                value={cp}
                // minlength="8"
                // maxlength="8"
              />
              <Input
                className="inputUtilisateur"
                forId="mot"
                type="password"
                champ="Mot de passe"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <Button
                classButton="envoyer"
                onClick={postUser}
                champButton="CONNEXION"
                type="submit"
              />
            </form>
            <div className="trait" />
            <Link className="link" to="/profile">
              <Button
                classButton="inscription"
                champButton="S'INSCRIRE"
                type="submit"
              />
            </Link>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Login;
