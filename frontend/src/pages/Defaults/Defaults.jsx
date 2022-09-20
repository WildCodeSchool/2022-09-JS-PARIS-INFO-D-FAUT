import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Defaults.css";
import {
  getDefaults,
  deleteDefaults,
  updateDefaults,
} from "../../services/axios/AxiosDefaults";
import { LatitudeContext, LongitudeContext } from "../../context/index";
import { Footer, Header, Button, DefaultCard } from "../../components/index";

const Defaults = () => {
  const [problem, setProblem] = useState([]);
  const { latitude } = useContext(LatitudeContext);
  const { longitude } = useContext(LongitudeContext);
  const [station, setStation] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");

  const data = { station, description, picture, longitude, latitude };

  useEffect(() => {
    getDefaults(setProblem);
  }, [problem]);

  return (
    <div className="defaults-container">
      <Header backCss="backDefaults" profileCss="profileDefaults" />
      <div className="defaults-display">
        {problem && (
          <>
            {problem.map((problems) => (
              <div className="map-container" key={problems.id_default}>
                <DefaultCard
                  station={problems.station}
                  tgv={problems.tgv_number}
                  ter={problems.ter_number}
                  track={problems.railway_track_number}
                  description={problems.description}
                  image={problems.picture}
                  imgAlt="image du defaut"
                  latitude={problems.latitude}
                  longitude={problems.longitude}
                  id_default={problems.id_default}
                />

                <Button
                  name="delete"
                  classButton="delete-button"
                  champButton="Supprimer"
                  type="button"
                  onClick={(e) =>
                    deleteDefaults(problems.id_default, setProblem, e)
                  }
                />

                <Link to={`/updateDefaults/${problems.id_default}`}>
                  <Button
                    name="update"
                    classButton="update-button"
                    champButton="Mettre à jour"
                    type="button"
                  />
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Defaults;
