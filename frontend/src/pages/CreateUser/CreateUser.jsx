import React, { useState } from "react";
import "./CreateUser.css";
import { useNavigate } from "react-router-dom";
import { InputPassword } from "../../components/Input/InputPassword";
import { Footer, Header, Input, Button } from "../../components/index";
import { postCreateUser } from "../../services/axios/AxiosUsers";
import profilelogo from "../../assets/profile.gif";

const CreateUser = () => {
  const navigate = useNavigate();

  const [cp, setCp] = useState("");
  const [mail, setMail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const [cpRegex, setCpRegex] = useState(true);
  const [mailRegex, setMailRegex] = useState(true);
  const [phoneRegex, setPhoneRegex] = useState(true);
  const [passwordRegex, setPasswordRegex] = useState(true);
  const [success, setSuccess] = useState(false);

  const [errorConnect, setErrorConnect] = useState(false);

  const verifPasswords = password !== secondPassword;

  const nav = () => {
    navigate("/");
  };

  const data = {
    cp,
    mail,
    phone_number,
    password,
  };

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

  const regexMail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };

  const mailControl = () => {
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

  const phoneControl = () => {
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

  const passwordControl = () => {
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

  const durationNav = () => {
    setTimeout(nav, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      cpControl(cp) &&
      mailControl(mail) &&
      phoneControl(phone_number) &&
      passwordControl(password)
    ) {
      postCreateUser(
        data,
        setErrorConnect,
        alertSuccess,
        durationNav,
        setErrorConnect
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
              field="Numéro de CP *"
              onChange={(e) => setCp(e.target.value)}
              value={cp}
            />
            <p className="fieldFalse">
              {cpRegex === false
                ? "⚠️ Le CP doit etre composé de 7 chiffres et une lettre"
                : ""}
            </p>
          </div>

          <div className="inputProfileTwo">
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
            <p className="fieldFalse">
              {phoneRegex === false
                ? "⚠️ le téléphone n'est pas valide il doit contenir 10 chiffres"
                : ""}
            </p>
          </div>
          <div className="profile-logo">
            <img className="logoProfile" src={profilelogo} alt="Logo" />
          </div>
          <div className="inputProfileFour">
            <InputPassword
              className="inputProfile"
              forId="mot"
              field="Mot de passe *"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="on"
              value={password}
              minlength="8"
            />
            <p className="fieldFalse">
              {passwordRegex === false
                ? "⚠️ le mot de passe doit contenir au minimum: une majuscule, une minuscule, un chiffre, un caractère spécial parmi : -.:;,+!?*$@%_ et doit contenir minimum 8 caractères"
                : ""}
            </p>
          </div>
          <div className="inputProfileFive">
            <InputPassword
              className="inputProfile"
              forId="confirmation"
              field="Confirmation du mot de passe *"
              onChange={(e) => setSecondPassword(e.target.value)}
              autoComplete="on"
              value={secondPassword}
              minlength="8"
            />
            <p className="fieldFalse">
              {verifPasswords === true
                ? "⚠️ Les deux mots de passe doivent être identiques"
                : ""}
            </p>
          </div>
          <div className="inputProfileSix">
            <Button
              classButton="sendCreate"
              disabled={verifPasswords}
              onClick={handleSubmit}
              fieldButton="ENVOYER"
              type="submit"
            />
            <p className="fieldFalse">
              {success === true
                ? "🏆 Votre profil a bien été créé ! 😀 🏆 Vous pouvez maintenant vous connecter"
                : ""}
            </p>
            <p className="fieldFalse">
              {errorConnect === true
                ? "Le numero de CP ou le mail existe déja"
                : ""}
            </p>
          </div>
        </form>

        <Footer legalCss="legalOffProfile" />
      </div>
    </div>
  );
};

export default CreateUser;
