import React, { useState, useContext } from "react";
import "./UpdateUser.css";
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
      return true;
    }
    alert("Le numéro de CP doit etre composé de 7 chiffres et une lettre");
    return false;
  };

  const regexMail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };

  const mailControle = () => {
    if (regexMail(mail)) {
      return true;
    }
    alert("le mail n'est pas valide ");
    return false;
  };

  const regexPhone = (value) => {
    return /^$|^[0-9]{10}$/.test(value);
  };

  const phoneControle = () => {
    if (regexPhone(phone_number)) {
      return true;
    }
    alert(
      "le numéro de téléphone n'est pas valide, il doit contenir 10 chiffres"
    );
    return false;
  };

  const regexPassword = (value) => {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[-.:;,+!?*$@%_])([-.:;,+!?*$@%_\w]{8,})$/.test(
      value
    );
  };

  const passwordControle = () => {
    if (regexPassword(password)) {
      return true;
    }
    alert(
      "le mot de passe n'est pas valide, il doit contenir une Majuscule, une minuscule, un chiffre et un caractère spécial parmis : -.:;,+!?*$@%_ et doit contenir minimum 8 caractères"
    );
    return false;
  };

  const handleSubmit = () => {
    if (
      cpControle(cp) &&
      mailControle(mail) &&
      phoneControle(phone_number) &&
      passwordControle(password)
    ) {
      updateUser(id_user, data, setPassword, setSecondPassword);
    }
  };

  return (
    <div className="updateUser-container">
      <Header
        backCss="backUpdateUser"
        profileCss="profileUpdateUser"
        loginCss="loginUpdateUser"
        admin0Css="admin0UpdateUser"
      />

      <form className="profile_champ-container">
        <h1>MODIFICATION</h1>
        <Input
          className="inputProfil"
          forId="cp"
          type="text"
          champ="Numéro de CP"
          onChange={(e) => setCp(e.target.value)}
          value={cp}
          // minlength="8"
          // maxlength="8"
        />
        <Input
          className="inputProfil"
          forId="mail"
          type="email"
          champ="Adresse mail"
          onChange={(e) => setMail(e.target.value)}
          value={mail}
        />
        <Input
          className="inputProfil"
          forId="telephone"
          type="tel"
          champ="Téléphone"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phone_number}
        />
        <InputPassword
          className="inputProfil"
          forId="mot"
          champ="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="on"
          value={password}
        />
        <InputPassword
          className="inputProfil"
          forId="confirmation"
          champ="Confirmation du mot de passe"
          onChange={(e) => setSecondPassword(e.target.value)}
          autoComplete="on"
          value={secondPassword}
        />
        <Button
          classButton="envoyer"
          disabled={verifPasswords}
          onClick={(e) => handleSubmit(e)}
          champButton="ENVOYER"
          type="button"
        />
      </form>
      <Footer />
    </div>
  );
};

export default UpdateUser;
