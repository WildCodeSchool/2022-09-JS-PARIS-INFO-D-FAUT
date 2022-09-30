import React, { useContext } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { Footer, Header, Button } from "../../components/index";
import { UserContext } from "../../context/index";

const Profile = () => {
  const { user } = useContext(UserContext);
  const cp = user.cp;
  const mail = user.mail;
  const phone_number = user.phone_number;

  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate("/UpdateUser");
  };

  return (
    <div className="prof-container">
      <Header />
      <div className="prof-champs-container">
        <h1>PROFIL :</h1>
        <h2>CP: {cp}</h2>
        <h3>mail: {mail}</h3>
        <h3>téléphone: {phone_number}</h3>
        <Button
          classButton="update-profile"
          champButton="MODIFIER"
          type="button"
          onClick={handleUpdate}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
