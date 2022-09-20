import React, { useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-remove.png";
import profile from "../../assets/logo-profil.png";
import back from "../../assets/logo-back.png";
import { ProfileContext } from "../../context/index";

export const Header = ({ backCss, profileCss }) => {
  const { id_user } = useContext(ProfileContext);

  return (
    <div className="header-container">
      <div className="header-back">
        <Link to={`/items/${id_user}`}>
          <img
            className={`back ${backCss}`}
            src={back}
            alt="logo utilisateur"
          />
        </Link>
      </div>
      <div className="header-logo">
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <div className="header-utilisateur">
        <Link to="/">
          <img
            className={`profile ${profileCss}`}
            src={profile}
            alt="logo utilisateur"
          />
        </Link>
      </div>
    </div>
  );
};
