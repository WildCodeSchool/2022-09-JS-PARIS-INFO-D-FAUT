import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import emergency from "../../assets/logo-emergency.jpg";
import connect from "../../assets/logo-connect.png";
import legal from "../../assets/logo-legal.png";

export const Footer = () => {
  return (
    <div className="footer-container">
      <a href="https://www.transilien.com/fr/page-medias/application-3117">
        <img className="emergency" src={emergency} alt="logo 3117" />
      </a>
      <Link to="/legal">
        <img className="legal" src={legal} alt="mention legal" />
      </Link>
      <a href="https://www.sncf-connect.com/">
        <img className="connect" src={connect} alt="logo connect" />
      </a>
    </div>
  );
};
