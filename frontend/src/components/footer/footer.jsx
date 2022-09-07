import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import emergency from "../../assets/logo-emergency.png";
import connect from "../../assets/logo-connect.png";
import legal from "../../assets/logo-legal.png";

export const Footer = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/legal");
  };

  return (
    <div className="footer-container">
      <a href="https://www.transilien.com/fr/page-medias/application-3117">
        <img className="emergency" src={emergency} alt="logo 3117" />
      </a>

      <div
        role="button"
        onClick={handleClick}
        onKeyPress={handleClick}
        tabIndex="0"
      >
        <img className="legal" src={legal} alt="mention legal" />
      </div>

      <a href="https://www.sncf-connect.com/">
        <img className="connect" src={connect} alt="logo connect" />
      </a>
    </div>
  );
};
