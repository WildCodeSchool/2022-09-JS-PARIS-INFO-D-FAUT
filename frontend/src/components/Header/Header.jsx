import React, { useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-essai1.png";
import profile from "../../assets/logo-profil.png";
import cross from "../../assets/croix.png";
import back from "../../assets/logo-back.png";
import { CpUserContext } from "../../context/index";

export const Header = ({ backCss, profileCss }) => {
  const { cp } = useContext(CpUserContext);

  return (
    <div className="header-container">
      <div className="header-back">
        <Link to={`/items/${cp}`}>
          <img
            className={`back ${backCss}`}
            src={back}
            alt="logo utilisateur"
          />
        </Link>
        <Link to="/admin">
          <p>hfhj</p>
        </Link>
      </div>
      <div className="header-logo">
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <div className="header-utilisateur">
        <div className="header-flex">
          <Link to={`/Profile/${cp}`}>
            <img
              className={`profile ${profileCss}`}
              src={profile}
              alt="logo utilisateur"
            />
            <p>Profil</p>
          </Link>
          <Link to="/">
            <img
              className={`profile ${profileCss}`}
              src={cross}
              alt="logo utilisateur"
            />
            <p>Déconnection</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
