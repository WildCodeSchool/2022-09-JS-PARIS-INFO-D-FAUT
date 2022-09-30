import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/index";
import { Header, Footer, Input, Button } from "../../components/index";
import { InputPassword } from "../../components/Input/InputPassword";
import "./Login.css";
import Home from "../Home/Home";

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  const [cp, setCp] = useState("");
  const [password, setPassword] = useState("");
  const [sucess, setSucess] = useState(false);

  const postUser = async (e) => {
    e.preventDefault();

    const data = {
      cp,
      password,
    };

    const response = await axios.post(`http://localhost:5000/login`, data);
    if (response.data) {
      const token = response.data.token;
      localStorage.setItem("token", token);
      setUser(response.data.user);
    }
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
          <Header backCss="backLogin" profileCss="profileLogin" />
          <div className="champ-container">
            <div className="formulaire">
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
                <InputPassword
                  className="inputPassword"
                  forId="mot"
                  champ="Mot de passe"
                  autoComplete="on"
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
              <Link className="linkProfile" to="/CreateProfile">
                <Button
                  classButton="inscription"
                  champButton="S'INSCRIRE"
                  type="submit"
                />
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Login;
