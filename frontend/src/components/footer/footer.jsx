import React from "react";
import "./Footer.css";
import emergency from "../../assets/logo-emergency.jpg";
import connect from "../../assets/logo-connect.png";

export const Footer = () => {
  return (
    <div className="footer-container">
      <a href="https://www.transilien.com/fr/page-medias/application-3117">
        <img className="emergency" src={emergency} alt="logo 3117" />
      </a>
      <a href="https://www.sncf-connect.com/">
        <img className="connect" src={connect} alt="logo connect" />
      </a>
    </div>
  );
};
