import React, { useState } from "react";
import "./CreateProfile.css";
import { useNavigate } from "react-router-dom";
import { InputPassword } from "../../components/Input/InputPassword";
import { Footer, Header, Input, Button } from "../../components/index";
import { postProfile } from "../../services/axios/AxiosUsers";

const CreateProfile = () => {
  const [cp, setCp] = useState("");
  const [mail, setMail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const navigate = useNavigate();

  const nav = () => {
    navigate("/");
  };

  const data = {
    cp,
    mail,
    phone_number,
    password,
  };

  const verifPasswords = password !== secondPassword;

  const regexCP = (value) => {
    return /^[0-9]{7}[a-zA-Z]{1}$/.test(value);
  };

  const cpControle = () => {
    if (regexCP(cp)) {
      return true;
    }
    alert(
      "⚠️ Le numéro de CP doit etre composé de: \n 7 chiffres et une lettre"
    );
    return false;
  };

  const regexMail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };

  const mailControle = () => {
    if (regexMail(mail)) {
      return true;
    }
    alert("⚠️ le mail n'est pas valide ");
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
      "⚠️ le numéro de téléphone n'est pas valide: \n il doit contenir 10 chiffres"
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
      "⚠️ le mot de passe n'est pas valide, il doit contenir au minimum: \n une majuscule, \n une minuscule, \n un chiffre \n un caractère spécial parmis : -.:;,+!?*$@%_ \n et doit contenir minimum 8 caractères"
    );
    return false;
  };

  const alertSucess = () => {
    alert(
      "🏆 Votre profil a bien été créé ! 😀 🏆 \n Vous pouvez maintenant vous connecter"
    );
  };

  const handleSubmit = () => {
    if (
      cpControle(cp) &&
      mailControle(mail) &&
      phoneControle(phone_number) &&
      passwordControle(password)
    ) {
      postProfile(
        data,
        setCp,
        setMail,
        setPhoneNumber,
        setPassword,
        setSecondPassword,
        alertSucess(),
        nav()
      );
    }
  };

  return (
    <div>
      <div className="profile-container">
        <Header
          backCss="backProfile"
          profileCss="profileProfile"
          logoutCss="logoutProfile"
          adminCss="adminProfile"
          admin0Css="admin0Profile"
        />

        <form className="profile_champ-container">
          <h1>PROFIL</h1>
          <Input
            className="inputProfil"
            forId="cp"
            type="text"
            champ="Numéro de CP"
            onChange={(e) => setCp(e.target.value)}
            value={cp}
            v
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
            pattern="[09]{10}"
            champ="Téléphone"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phone_number}
            minlength="10"
            maxlength="10"
          />
          <InputPassword
            className="inputProfil"
            forId="mot"
            champ="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="on"
            value={password}
            minlength="8"
          />
          <InputPassword
            className="inputProfil"
            forId="confirmation"
            champ="Confirmation du mot de passe"
            onChange={(e) => setSecondPassword(e.target.value)}
            autoComplete="on"
            value={secondPassword}
            minlength="8"
          />
          <Button
            classButton="envoyer"
            disabled={verifPasswords}
            onClick={(e) => handleSubmit(e)}
            champButton="ENVOYER"
            type="submit"
          />
        </form>

        <Footer />
      </div>
    </div>
  );
};

export default CreateProfile;
