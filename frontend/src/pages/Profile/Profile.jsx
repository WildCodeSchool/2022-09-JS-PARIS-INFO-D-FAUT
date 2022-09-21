import React, { useState } from "react";
import "./Profile.css";
import { InputPassword } from "../../components/Input/InputPassword";
import { Footer, Header, Input, Button } from "../../components/index";
import { postProfile } from "../../services/axios/AxiosUsers";
import Login from "../Login/Login";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [sucess, setSucess] = useState(false);

  const [cp, setCp] = useState("");
  const [mail, setMail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const data = {
    cp,
    mail,
    phoneNumber,
    password,
  };

  return (
    <div>
      {sucess ? (
        <div>
          <Login />
        </div>
      ) : (
        <div className="profile-container">
          <Header backCss="backProfile" profileCss="profileProfile" />

          <form className="profile_champ-container">
            <h1>PROFIL</h1>
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
              value={phoneNumber}
            />
            <InputPassword
              className="inputProfil"
              forId="mot"
              type="password"
              champ="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <InputPassword
              className="inputProfil"
              forId="confirmation"
              type="password"
              champ="Confirmation du mot de passe"
            />
            <Button
              classButton="envoyer"
              onClick={(e) =>
                postProfile(
                  data,
                  setProfile,
                  setCp,
                  setMail,
                  setPhoneNumber,
                  setPassword,
                  setSucess,
                  e
                )
              }
              champButton="ENVOYER"
              type="submit"
            />
          </form>

          <Footer />
        </div>
      )}
    </div>
  );
};

export default Profile;
