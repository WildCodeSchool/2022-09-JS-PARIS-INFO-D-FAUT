import React, { useContext } from "react";
import "./Header.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/login.png";
import logo from "../../assets/logo-infoDefautSncf.png";
import profile from "../../assets/logo-profil.png";
import back from "../../assets/homeLogo.png";
import adminImg from "../../assets/admin.png";
import logoutImg from "../../assets/logout.png";
import { UserContext } from "../../context/index";

export const Header = ({
  backCss,
  adminOnCss,
  profileCss,
  loginCss,
  logoutCss,
  adminOffCss,
}) => {
  const { user, setUser } = useContext(UserContext);
  const cp = user.cp;
  const admin = user.admin;

  const navigate = useNavigate();

  const nav = () => {
    navigate("/");
  };

  const logout = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const config = { headers: { Authorization: `Bearer ${token}` } };

    const bodyParameters = {
      key: "value",
    };

    axios
      .post(`http://localhost:5000/logout`, bodyParameters, config)
      .then((response) => {
        localStorage.removeItem("token");
        nav();
      });
  };

  return (
    <header className="header-container">
      <div className="header-back-admin">
        <Link to={`/home/${cp}`}>
          <img className={`back ${backCss}`} src={back} alt="logo home" />
        </Link>
        <Link to="/admin">
          <img
            className={
              admin === 1 ? `adminOn ${adminOnCss}` : `adminOff ${adminOffCss}`
            }
            src={adminImg}
            alt="logo admin"
          />
        </Link>
      </div>
      <div className="header-logo">
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <div className="header-profile-logout">
        <Link to={`/Profile/${cp}`}>
          <img
            className={`profile ${profileCss}`}
            src={profile}
            alt="logo utilisateur"
          />
        </Link>
        <Link to="/">
          <img
            className={`login ${loginCss}`}
            src={loginImg}
            alt="logo login"
          />
        </Link>
        <div role="button" onClick={logout} onKeyPress={logout} tabIndex="0">
          <img
            className={`logout ${logoutCss}`}
            src={logoutImg}
            alt="logo logout"
          />
        </div>
      </div>
    </header>
  );
};
