import React, { useContext } from "react";
import "./Header.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/login.png";
import logo from "../../assets/logo-essai1.png";
import profile from "../../assets/logo-profil.png";
import back from "../../assets/logo-back.png";
import adminImg from "../../assets/admin.png";
import logoutImg from "../../assets/logout.png";
import { UserContext } from "../../context/index";

export const Header = ({
  backCss,
  adminCss,
  profileCss,
  loginCss,
  logoutCss,
  admin0Css,
}) => {
  const { user } = useContext(UserContext);
  const cp = user.cp;
  const admin = user.admin;

  const navigate = useNavigate();

  const nav = () => {
    navigate("/");
  };

  const logout = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const config = { headers: { Authorization: `Bearer ${token}` } };

    const bodyParameters = {
      key: "value",
    };

    const response = await axios.post(
      `http://localhost:5000/logout`,
      bodyParameters,
      config
    );
    nav();
    localStorage.removeItem("token");
  };

  return (
    <header className="header-container">
      <div className="header-back-admin">
        <Link to={`/items/${cp}`}>
          <img
            className={`back ${backCss}`}
            src={back}
            alt="logo utilisateur"
          />
        </Link>
        <Link to="/admin">
          <img
            className={
              admin === 1 ? `admin ${adminCss}` : `admin0 ${admin0Css}`
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
        <Link to="/">
          <div role="button" onClick={logout} onKeyPress={logout} tabIndex="0">
            <img
              className={`logout ${logoutCss}`}
              src={logoutImg}
              alt="logo logout"
            />
          </div>
          {/* <button onClick={logout}>Deconnection</button> */}
        </Link>
      </div>
    </header>
  );
};
