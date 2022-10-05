import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Defaults.css";
import {
  getDefaults,
  deleteDefaults,
} from "../../services/axios/AxiosDefaults";
import { UserContext } from "../../context/index";
import { Footer, Header, Button, DefaultCard } from "../../components/index";

const Defaults = () => {
  const [problem, setProblem] = useState([]);
  const { user } = useContext(UserContext);
  const cp = user.cp;
  useEffect(() => {
    getDefaults(setProblem);
  }, [problem]);

  return (
    <div className="defaults-container">
      <Header
        backCss="backDefaults"
        profileCss="profileDefaults"
        loginCss="loginDefaults"
      />
      <div className="defaults-display">
        {problem && (
          <>
            {problem.map((problems) => (
              <div className="map-container" key={problems.id_default}>
                <DefaultCard
                  etatContainer={problems.treatment}
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
                  traitement={problems.treatment}
                  cp={problems.cp}
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
                <Link to={`/DefaultViewAdmin/${cp}/${problems.id_default}`}>
                  <Button
                    name="update"
                    classButton="update-button"
                    champButton="modifier l'état"
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
