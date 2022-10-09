import React, { useState } from "react";
import "./CreateUser.css";
import { useNavigate } from "react-router-dom";
import { InputPassword } from "../../components/Input/InputPassword";
import { Footer, Header, Input, Button } from "../../components/index";
import { postCreateUser } from "../../services/axios/AxiosUsers";
import profilelogo from "../../assets/profile.gif";

const CreateUser = () => {
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

  const cpControl = () => {
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

  const mailControl = () => {
    if (regexMail(mail)) {
      return true;
    }
    alert("⚠️ le mail n'est pas valide ");
    return false;
  };

  const regexPhone = (value) => {
    return /^$|^[0-9]{10}$/.test(value);
  };

  const phoneControl = () => {
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

  const passwordControl = () => {
    if (regexPassword(password)) {
      return true;
    }
    alert(
      "⚠️ le mot de passe n'est pas valide, il doit contenir au minimum: \n une majuscule, \n une minuscule, \n un chiffre \n un caractère spécial parmi : -.:;,+!?*$@%_ \n et doit contenir minimum 8 caractères"
    );
    return false;
  };

  const alertSuccess = () => {
    alert(
      "🏆 Votre profil a bien été créé ! 😀 🏆 \n Vous pouvez maintenant vous connecter"
    );
  };

  const handleSubmit = () => {
    if (
      cpControl(cp) &&
      mailControl(mail) &&
      phoneControl(phone_number) &&
      passwordControl(password)
    ) {
      postCreateUser(
        data,
        setCp,
        setMail,
        setPhoneNumber,
        setPassword,
        setSecondPassword,
        alertSuccess(),
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
          adminOnCss="adminOnProfile"
          adminOffCss="adminOffProfile"
        />

        <form className="profileField-container">
          <h1>PROFIL</h1>
          <div className="inputProfileOne">
            <Input
              className="inputProfile"
              forId="cp"
              type="text"
              field="Numéro de CP"
              onChange={(e) => setCp(e.target.value)}
              value={cp}
              v
            />
          </div>
          <div className="inputProfileTwo">
            <Input
              className="inputProfile"
              forId="mail"
              type="email"
              field="Adresse mail"
              onChange={(e) => setMail(e.target.value)}
              value={mail}
            />
          </div>
          <div className="inputProfileThree">
            <Input
              className="inputProfile"
              forId="telephone"
              type="tel"
              pattern="[09]{10}"
              field="Téléphone"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phone_number}
              minlength="10"
              maxlength="10"
            />
          </div>
          <div className="profile-logo">
            <img className="logoProfile" src={profilelogo} alt="Logo" />
          </div>
          <div className="inputProfileFour">
            <InputPassword
              className="inputProfile"
              forId="mot"
              field="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="on"
              value={password}
              minlength="8"
            />
          </div>
          <div className="inputProfileFive">
            <InputPassword
              className="inputProfile"
              forId="confirmation"
              field="Confirmation du mot de passe"
              onChange={(e) => setSecondPassword(e.target.value)}
              autoComplete="on"
              value={secondPassword}
              minlength="8"
            />
          </div>
          <div className="inputProfileSix">
            <Button
              classButton="sendCreate"
              disabled={verifPasswords}
              onClick={(e) => handleSubmit(e)}
              fieldButton="ENVOYER"
              type="submit"
            />
          </div>
        </form>

        <Footer />
      </div>
    </div>
  );
};

export default CreateUser;
