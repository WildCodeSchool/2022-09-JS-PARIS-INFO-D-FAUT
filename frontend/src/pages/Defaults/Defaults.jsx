import React, { useContext, useEffect } from "react";
import "./Defaults.css";
// import { useParams } from "react-router-dom";
import {
  getDefaults,
  deleteDefaults,
  updateDefaults,
} from "../../services/axios/AxiosDefaults";
import {
  DefaultsContext,
  PictureContext,
  StationContext,
  DescriptionContext,
  LatitudeContext,
  LongitudeContext,
} from "../../context/index";
import { Footer, Header, Button, DefaultCard } from "../../components/index";

const Defaults = () => {
  const { problem, setProblem } = useContext(DefaultsContext);
  const { latitude } = useContext(LatitudeContext);
  const { longitude } = useContext(LongitudeContext);
  const { station } = useContext(StationContext);
  const { description } = useContext(DescriptionContext);
  const { picture } = useContext(PictureContext);
  // const { id } = useParams();

  // const id = 1;
  const data = { station, description, picture, longitude, latitude };

  // const getDefaults = () => {
  //   axios
  //     .get("http://localhost:5000/defaults")
  //     .then((response) => response.data)

  //     .then((data) => {
  //       setProblem(data.result);
  //     });
  // };

  useEffect(() => {
    getDefaults(setProblem);
  }, []);

  // const deleteDefaults = async (id_default) => {
  //   const response = await axios.delete(
  //     `http://localhost:5000/defaults/${id_default}`
  //   );
  //   if (response.data.problem) {
  //     setProblem(response.data.problem);
  //   }
  // };

  // const updateDefaults = async (id_default, data) => {
  //   const data = { station, description, picture, longitude, latitude };
  //   const response = await axios.put(
  //     `http://localhost:5000/defaults/${id_default}`,
  //     data
  //   );
  //   if (response.data.problem) {
  //     setProblem();
  //   }
  // };

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

                <Button
                  name="update"
                  classButton="update-button"
                  champButton="Mettre à jour"
                  type="button"
                  onClick={(e) =>
                    updateDefaults(problems.id_default, data, setProblem, e)
                  }
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
