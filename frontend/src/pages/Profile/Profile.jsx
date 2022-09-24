import React, { useState } from "react";
import "./Profile.css";
import { InputPassword } from "../../components/Input/InputPassword";
import { Footer, Header, Input, Button } from "../../components/index";
import { postProfile } from "../../services/axios/AxiosUsers";
import logo from "../../assets/logo-essai1.png";

const Profile = () => {
  const [cp, setCp] = useState("");
  const [mail, setMail] = useState("");
  const [phone_number, setPhoneNumber] = useState(0);
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const data = {
    cp,
    mail,
    phone_number,
    password,
  };

  const verifPasswords = password !== secondPassword;

  return (
    <div>
      <div className="profile-container">
        <Header backCss="backProfile" profileCss="profileProfile" />

        <form className="profile_champ-container">
          <h1>PROFIL</h1>
          <div className="inputProfil1">
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
          </div>

          <div className="inputProfil2">
            <Input
              className="inputProfil"
              forId="mail"
              type="email"
              champ="Adresse mail"
              onChange={(e) => setMail(e.target.value)}
              value={mail}
            />
          </div>

          <div className="inputProfil3">
            <Input
              className="inputProfil"
              forId="telephone"
              type="tel"
              champ="Téléphone"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phone_number}
            />
          </div>

          <div className="profile-logo">
            <img className="logoProfile" src={logo} alt="Logo" />
          </div>

          <div className="inputProfil4">
            <InputPassword
              className="inputProfil"
              forId="mot"
              champ="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="on"
              value={password}
            />
          </div>
          <div className="inputProfil5">
            <InputPassword
              className="inputProfil"
              forId="confirmation"
              champ="Confirmation du mot de passe"
              onChange={(e) => setSecondPassword(e.target.value)}
              autoComplete="on"
              value={secondPassword}
            />
          </div>
          <div className="envoyer">
            <Button
              classButton="envoyer"
              disabled={verifPasswords}
              onClick={(e) =>
                postProfile(
                  data,
                  setCp,
                  setMail,
                  setPhoneNumber,
                  setPassword,
                  setSecondPassword,
                  e
                )
              }
              champButton="ENVOYER"
              type="submit"
            />
          </div>
        </form>

        <Footer />
      </div>
    </div>
  );
};

export default Profile;
