import React, { useContext, useEffect } from "react";
import "./Defaults.css";
import axios from "axios";
import { DefaultsContext } from "../../context/DefaultsContext";
import { Footer, Header, Button } from "../../components/index";
import { DefaultCard } from "../../components/DefaultCard/DefaultCard";
import { PictureContext } from "../../context/PictureContext";
import { StationContext } from "../../context/StationContext";
import { DescriptionContext } from "../../context/DescriptionContext";
import { LatitudeContext } from "../../context/LatitudeContext";
import { LongitudeContext } from "../../context/LongitudeContext";

const Defaults = () => {
  const { problem, setProblem } = useContext(DefaultsContext);
  const { latitude } = useContext(LatitudeContext);
  const { longitude } = useContext(LongitudeContext);
  const { station } = useContext(StationContext);
  const { description } = useContext(DescriptionContext);
  const { picture } = useContext(PictureContext);

  const getDefaults = () => {
    axios
      .get("http://localhost:5000/defaults")
      .then((response) => response.data)

      .then((data) => {
        setProblem(data.result);
      });
  };

  useEffect(() => {
    getDefaults();
  }, []);

  const deleteDefaults = async (id_default) => {
    const response = await axios.delete(
      `http://localhost:5000/defaults/${id_default}`
    );
    if (response.data.problem) {
      setProblem(response.data.problem);
    }
  };

  const updateDefaults = async (id_default) => {
    const data = { station, description, picture, longitude, latitude };
    const response = await axios.put(
      `http://localhost:5000/defaults/${id_default}`,
      data
    );
    if (response.data.problem) {
      setProblem();
    }
  };

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
                  onClick={() => deleteDefaults(problems.id_default)}
                />

                <Button
                  name="update"
                  classButton="update-button"
                  champButton="Mettre à jour"
                  type="button"
                  onClick={() => updateDefaults(problems.id_default)}
                />
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
