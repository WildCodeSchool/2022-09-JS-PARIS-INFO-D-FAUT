import React from "react";
import { Button } from "..";
import "./DefaultCard.css";

export const DefaultCard = ({
  station,
  tgv,
  ter,
  track,
  description,
  image,
  imgAlt,
  geoloc,
}) => {
  return (
    <div className="defaultCard-container">
      <ul>
        <li> {station} </li>
        <li> {tgv} </li>
        <li> {ter} </li>
        <li> {track} </li>
        <li> {description} </li>
        <li>
          <img src={image} alt={imgAlt} />
        </li>
        <li> {geoloc} </li>
      </ul>
      <div className="button-container">
        <Button
          name="delete"
          classButton="delete-button"
          champButton="Supprimer"
          type="button"
          // onClick=
        />
        <Button
          name="update"
          classButton="update-button"
          champButton="modifier"
          type="button"
          // onClick=
        />
      </div>
    </div>
  );
};
