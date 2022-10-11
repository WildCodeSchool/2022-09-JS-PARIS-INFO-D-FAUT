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

  const [cpRegex, setCpRegex] = useState(true);
  const [passwordRegex, setPasswordRegex] = useState(true);
  const [errorConnect, setErrorConnect] = useState(false);

  const regexCP = (value) => {
    return /^[0-9]{7}[a-zA-Z]{1}$/.test(value);
  };

  const cpControl = () => {
    if (regexCP(cp)) {
      setCpRegex(true);
      return true;
    }
    setCpRegex(false);
    return false;
  };

  const regexPassword = (value) => {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[-.:;,+!?*$@%_])([-.:;,+!?*$@%_\w]{8,})$/.test(
      value
    );
  };

  const passwordControl = () => {
    if (regexPassword(password)) {
      setPasswordRegex(true);
      return true;
    }
    setPasswordRegex(false);
    return false;
  };

  const postUser = (e) => {
    e.preventDefault();
    const data = {
      cp,
      password,
    };

    if (cpControl(cp) && passwordControl(password)) {
      axios
        .post(`http://localhost:5000/login`, data)
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("token", token);
          setUser(response.data.user);
          setPassword("");
          navigate(`/home/${cp}`);
        })
        .catch((error) => {
          setErrorConnect(true);
        });
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
              field="Numéro de CP *"
              onChange={(e) => setCp(e.target.value)}
              value={cp}
              minlength="8"
              maxlength="8"
            />
            <p className="fieldFalse">
              {cpRegex === false
                ? "⚠️ Le CP doit etre composé de 7 chiffres et une lettre"
                : ""}
            </p>
            <InputPassword
              className="inputPassword"
              forId="mot"
              field="Mot de passe *"
              autoComplete="on"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              minlength="8"
            />
            <p className="fieldFalse">
              {passwordRegex === false
                ? "⚠️ le mot de passe doit contenir au minimum: une majuscule, une minuscule, un chiffre, un caractère spécial parmi : -.:;,+!?*$@%_ et doit contenir minimum 8 caractères"
                : ""}
            </p>

            <p className="fieldFalse">
              {errorConnect === true ? "⚠️ Connexion impossible ⚠️" : ""}
            </p>
            <p className="fieldFalse">
              {errorConnect === true
                ? "Veuillez vérifier votre numéro de CP et votre mot de passe"
                : ""}
            </p>

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
