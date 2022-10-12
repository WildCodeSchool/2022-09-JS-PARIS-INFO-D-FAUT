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
    navigate(`/UpdateUser/${cp}`);
  };

  return (
    <div className="profile-container">
      <Header loginCss="loginProfile" adminOffCss="adminOffProfile" />
      <div className="profile-field-container">
        <h1 className="title">PROFIL :</h1>
        <p className="textProfile cp">
          <span className="titles">
            CP: <br />
          </span>
          {cp}
        </p>
        <p className="textProfile mail">
          <span className="titles">
            Mail: <br />
          </span>
          {mail}
        </p>
        <p className="textProfile phone">
          <span className="titles">
            Téléphone: <br />
          </span>
          {phone_number}
        </p>
        <Button
          classButton="update-profile button"
          fieldButton="MODIFIER"
          type="button"
          onClick={handleUpdate}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
