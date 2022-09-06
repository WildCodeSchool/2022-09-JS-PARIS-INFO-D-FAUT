import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-remove.png";
import profile from "../../assets/logo-profil.jpg";
import back from "../../assets/logo-back.jpg";

export const Header = ({ backCss, profileCss }) => {
  return (
    <div className="header-container">
      <Link to="/">
        <img className={backCss} src={back} alt="logo utilisateur" />
      </Link>
      <img className="logo" src={logo} alt="Logo" />
      <Link to="/utilisateur">
        <img className={profileCss} src={profile} alt="logo utilisateur" />
      </Link>
    </div>
  );
};
