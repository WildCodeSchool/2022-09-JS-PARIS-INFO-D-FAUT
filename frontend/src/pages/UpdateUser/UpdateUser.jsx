import React, { useState, useContext } from "react";
import axios from "axios";
import "./UpdateUser.css";
import { useNavigate } from "react-router-dom";
import {
  Footer,
  Header,
  Input,
  Button,
  InputPassword,
} from "../../components/index";
import { UserContext } from "../../context/index";

import { updateUser } from "../../services/axios/AxiosUsers";

const UpdateUser = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const id_user = user.id_user;
  const cpDefault = user.cp;
  const mailDefault = user.mail;
  const phone_numberDefault = user.phone_number;

  const [cp, setCp] = useState(cpDefault);
  const [mail, setMail] = useState(mailDefault);
  const [phone_number, setPhoneNumber] = useState(phone_numberDefault);
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const [cpRegex, setCpRegex] = useState(true);
  const [mailRegex, setMailRegex] = useState(true);
  const [phoneRegex, setPhoneRegex] = useState(true);
  const [passwordRegex, setPasswordRegex] = useState(true);
  const [success, setSuccess] = useState(false);

  const [errorConnect, setErrorConnect] = useState(false);

  const verifPasswords = password !== secondPassword;

  const data = {
    id_user,
    cp,
    mail,
    phone_number,
    password,
  };

  const regexCP = (value) => {
    return /^[0-9]{7}[a-zA-Z]{1}$/.test(value);
  };

  const cpControle = () => {
    if (regexCP(cp)) {
      setCpRegex(true);
      return true;
    }
    setCpRegex(false);
    return false;
  };

  const regexMail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };

  const mailControle = () => {
    if (regexMail(mail)) {
      setMailRegex(true);
      return true;
    }
    setMailRegex(false);
    return false;
  };

  const regexPhone = (value) => {
    return /^$|^[0-9]{10}$/.test(value);
  };

  const phoneControle = () => {
    if (regexPhone(phone_number)) {
      setPhoneRegex(true);
      return true;
    }
    setPhoneRegex(false);
    return false;
  };

  const regexPassword = (value) => {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[-.:;,+!?*$@%_])([-.:;,+!?*$@%_\w]{8,})$/.test(
      value
    );
  };

  const passwordControle = () => {
    if (regexPassword(password)) {
      setPasswordRegex(true);
      return true;
    }
    setPasswordRegex(false);
    return false;
  };

  const alertSuccess = () => {
    setSuccess(true);
  };

  const nav = () => {
    navigate("/");
  };

  const durationNav = () => {
    setTimeout(nav, 3000);
  };

  const logout = async () => {
    const token = localStorage.getItem("token");

    const config = { headers: { Authorization: `Bearer ${token}` } };

    const bodyParameters = {
      key: "value",
    };

    const response = await axios.post(
      `http://localhost:5000/logout`,
      bodyParameters,
      config
    );
    nav();
    localStorage.removeItem("token");
  };

  const duration = () => {
    setTimeout(logout, 4000);
  };

  const handleSubmit = () => {
    if (
      cpControle(cp) &&
      mailControle(mail) &&
      phoneControle(phone_number) &&
      passwordControle(password)
    ) {
      updateUser(
        id_user,
        data,
        setErrorConnect,
        alertSuccess,
        durationNav,
        setErrorConnect
      );
    }
  };

  return (
    <div className="updateUser-container">
      <Header
        backCss="backUpdateUser"
        profileCss="profileUpdateUser"
        loginCss="loginUpdateUser"
        adminOffCss="adminOffUpdateUser"
      />

      <form className="profile_field-container">
        <h1>MODIFICATION</h1>
        <Input
          className="inputProfile"
          forId="cp"
          type="text"
          field="Numéro de CP *"
          onChange={(e) => setCp(e.target.value)}
          value={cp}
        />
        <p className="fieldFalse">
          {cpRegex === false
            ? "⚠️ Le CP doit etre composé de 7 chiffres et une lettre"
            : ""}
        </p>

        <Input
          className="inputProfile"
          forId="mail"
          type="email"
          field="Adresse mail *"
          onChange={(e) => setMail(e.target.value)}
          value={mail}
        />
        <p className="fieldFalse">
          {mailRegex === false ? "⚠️ le mail n'est pas valide " : ""}
        </p>

        <Input
          className="inputProfile"
          forId="telephone"
          type="tel"
          field="Téléphone"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phone_number}
        />
        <p className="fieldFalse">
          {phoneRegex === false
            ? "⚠️ le téléphone n'est pas valide il doit contenir 10 chiffres"
            : ""}
        </p>

        <InputPassword
          className="inputProfile"
          forId="mot"
          field="Mot de passe *"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="on"
          value={password}
        />
        <p className="fieldFalse">
          {passwordRegex === false
            ? "⚠️ le mot de passe doit contenir au minimum: une majuscule, une minuscule, un chiffre, un caractère spécial parmi : -.:;,+!?*$@%_ et doit contenir minimum 8 caractères"
            : ""}
        </p>
        <InputPassword
          className="inputProfile"
          forId="confirmation"
          field="Confirmation du mot de passe *"
          onChange={(e) => setSecondPassword(e.target.value)}
          autoComplete="on"
          value={secondPassword}
        />
        <Button
          classButton="sendUpdateUser"
          disabled={verifPasswords}
          onClick={(e) => handleSubmit(e)}
          fieldButton="ENVOYER"
          type="button"
        />
        <p className="fieldFalse">
          {success === true ? "🏆 Votre profil a bien été modifié ! 😀 🏆" : ""}
        </p>
        <p className="fieldFalse">
          {success === true ? "Veuillez vous reconnecter, merci." : ""}
        </p>
        <p className="fieldFalse">
          {errorConnect === true
            ? "⚠️ Le CP ou l'adresse mail saisi existe déjà ⚠️"
            : ""}
        </p>
      </form>
      <Footer />
    </div>
  );
};

export default UpdateUser;
