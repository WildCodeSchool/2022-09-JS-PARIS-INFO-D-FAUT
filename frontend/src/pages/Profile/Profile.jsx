import React, { useState, useContext } from "react";
import axios from "axios";
import "./Profile.css";
import { Footer, Header, Input, Button } from "../../components/index";
import { ProfileContext } from "../../context/index";

const Profile = () => {
  const { setProfile } = useContext(ProfileContext);
  const [cp, setCp] = useState("");
  const [mail, setMail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const postProfile = async () => {
    const data = {
      cp,
      mail,
      phoneNumber,
      password,
    };

    const response = await axios.post(`http://localhost:5000/users`, data);
    if (response.data.problem) {
      setProfile();
    }
  };

  return (
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
        <Input
          className="inputProfil"
          forId="mot"
          type="password"
          champ="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Input
          className="inputProfil"
          forId="confirmation"
          type="password"
          champ="Confirmation du mot de passe"
        />
        <Button
          classButton="envoyer"
          onClick={postProfile}
          champButton="ENVOYER"
          type="submit"
        />
      </form>

      <Footer />
    </div>
  );
};

export default Profile;
