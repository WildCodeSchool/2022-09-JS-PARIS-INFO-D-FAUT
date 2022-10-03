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
            minlength="8"
            maxlength="8"
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
            onClick={(e) =>
              postProfile(
                data,
                setCp,
                setMail,
                setPhoneNumber,
                setPassword,
                setSecondPassword,
                nav(),
                e
              )
            }
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
