import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/index";
import { Header, Footer, Input, Button } from "../../components/index";
import { InputPassword } from "../../components/Input/InputPassword";
import "./Login.css";

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [cp, setCp] = useState("");
  const [password, setPassword] = useState("");

  const regexCP = (value) => {
    return /^[0-9]{7}[a-zA-Z]{1}$/.test(value);
  };

  function cpControl() {
    if (regexCP(cp)) {
      return true;
    }
    alert("Le numéro de CP doit etre composé de 7 chiffres et une lettre");
    return false;
  }

  const regexPassword = (value) => {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[-.:;,+!?*$@%_])([-.:;,+!?*$@%_\w]{8,})$/.test(
      value
    );
  };

  function passwordControl() {
    if (regexPassword(password)) {
      return true;
    }
    alert(
      "le mot de passe n'est pas valide, il doit contenir une Majuscule, une minuscule, un chiffre et un caractère spécial parmi : -.:;,+!?*$@%_ et doit contenir minimum 8 caractères"
    );
    return false;
  }

  const postUser = async (e) => {
    e.preventDefault();

    const data = {
      cp,
      password,
    };

    if (cpControl(cp) && passwordControl(password)) {
      const response = await axios.post(`http://localhost:5000/login`, data);
      if (response.data) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setUser(response.data.user);
      }
      setPassword("");
      navigate(`/items/${cp}`);
    }
  };

  return (
    <div className="login-container">
      <Header
        backCss="backLogin"
        profileCss="profileLogin"
        loginCss="loginLogin"
        logoutCss="logoutLogin"
        adminOnCss="adminOnLogin"
        adminOffCss="adminOffLogin"
      />
      <div className="field-container">
        <div className="form">
          <form className="form-container">
            <h1>UTILISATEUR</h1>
            <Input
              className="inputCp"
              forId="cp"
              type="text"
              field="Numéro de CP"
              onChange={(e) => setCp(e.target.value)}
              value={cp}
              minlength="8"
              maxlength="8"
            />
            <InputPassword
              className="inputPassword"
              forId="mot"
              field="Mot de passe"
              autoComplete="on"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              minlength="8"
            />
            <Button
              classButton="send"
              onClick={postUser}
              fieldButton="CONNEXION"
              type="submit"
            />
          </form>
          <div className="trait" />
          <Link className="linkProfile" to="/createUser">
            <Button
              classButton="inscription"
              fieldButton="S'INSCRIRE"
              type="submit"
            />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
