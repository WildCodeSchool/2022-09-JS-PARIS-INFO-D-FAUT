import React, { useState, useContext, useEffect } from "react";
import "./Update.css";
import { useParams } from "react-router-dom";
import {
  updateDefaults,
  getUserDefaultById,
} from "../../services/axios/AxiosDefaults";

import { Input, Button, Textarea } from "../index";

import {
  IdUserContext,
  LongitudeContext,
  LatitudeContext,
} from "../../context/index";

export const Update = () => {
  const { id_default } = useParams();
  const { id_user } = useContext(IdUserContext);
  const [problem, setProblem] = useState([]);

  const [station, setStation] = useState("gare:");

  const [railway_track_number, setRailwayNumber] = useState(0);
  const [ter_number, setTerNumber] = useState(0);
  const [tgv_number, setTgvNumber] = useState(0);
  const [description, setDescription] = useState("description");
  const [picture, setPicture] = useState("");
  const { latitude, setLatitude } = useContext(LatitudeContext);
  const { longitude, setLongitude } = useContext(LongitudeContext);

  useEffect(() => {
    getUserDefaultById(
      id_default,
      setProblem,
      setStation,
      setRailwayNumber,
      setTerNumber,
      setTgvNumber,
      setDescription
      // setPicture
    );
  }, []);

  const data = {
    id_user,
    station,
    railway_track_number,
    ter_number,
    tgv_number,
    description,
    picture,
    longitude,
    latitude,
  };

  return (
    <div className="update-container">
      <form className="gare_champ-container">
        <h1>MODIFICATION</h1>
        {/* <Input
          className="inputGare"
          forId="cp"
          type="text"
          champ="Numéro de CP"
          minlength={8}
          maxlength={8}
        /> */}
        <Input
          className="inputGare"
          onChange={(e) => setStation(e.target.value)}
          value={station}
          forId="gare"
          type="text"
          champ="Gare concernée"
        />
        <Input
          className="inputReseau"
          onChange={(e) => setRailwayNumber(e.target.value)}
          value={railway_track_number}
          forId="ligne"
          type="number"
          champ="Numéro de ligne / Emprise"
        />
        <Input
          className="inputTer"
          onChange={(e) => setTerNumber(e.target.value)}
          value={ter_number}
          forId="ter"
          type="number"
          champ="Numéro de Ter"
        />
        <Input
          className="inputVoyageurs"
          onChange={(e) => setTgvNumber(e.target.value)}
          value={tgv_number}
          forId="tgv"
          type="number"
          champ="Numéro du train"
        />
        <Textarea
          className="textGare"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          forId="field"
          type="text"
        />
        <Input
          className="inputGare"
          onChange={(e) => setPicture(e.target.value)}
          value={picture}
          forId="file"
          type="file"
          champ="Joindre une photographie"
        />
        <Input
          className="inputGare"
          forId="file"
          onChange={(e) => setLatitude(e.target.value)}
          type="text"
          value={latitude}
          champ="Latitude"
        />
        <Input
          className="inputGare"
          forId="file2"
          onChange={(e) => setLongitude(e.target.value)}
          type="text"
          value={longitude}
          champ="Longitude"
        />
        <Button
          classButton="envoyer"
          onClick={(e) =>
            updateDefaults(
              id_default,
              data,
              setProblem,
              setStation,
              setRailwayNumber,
              setTerNumber,
              setTgvNumber,
              setDescription,
              e
            )
          }
          champButton="ENVOYER"
          type="button"
        />
      </form>
    </div>
  );
};
