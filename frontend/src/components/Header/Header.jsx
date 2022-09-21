import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-essai1.png";
import profile from "../../assets/logo-profil.png";
import back from "../../assets/logo-back.png";

export const Header = ({ backCss, profileCss }) => {
  return (
    <div className="header-container">
      <div className="header-back">
        <Link to="/items">
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
