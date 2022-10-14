import React from "react";
import "./UserCard.css";

export const UserCard = ({ id_user, cp, mail, phone_number }) => {
  return (
    <div className="userCard-container">
      <ul>
        <li className="cpUserCard">CP: {cp}</li>
        <li>
          <span className="spanUserCard">id user:</span> {id_user}{" "}
        </li>
        <li>
          <span className="spanUserCard">adresse mail:</span> {mail}{" "}
        </li>
        <li>
          <span className="spanUserCard">numéro de téléphone:</span>{" "}
          {phone_number}
        </li>
      </ul>
    </div>
  );
};
