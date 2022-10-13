import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DefaultsAdmin.css";
import {
  getDefaults,
  deleteDefaults,
} from "../../services/axios/AxiosDefaults";
import { UserContext } from "../../context/index";
import { Footer, Header, Button, DefaultCard } from "../../components/index";

const DefaultsAdmin = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const { user } = useContext(UserContext);
  const cp = user.cp;

  const nav = () => {
    navigate(`/home/${cp}`);
  };

  useEffect(() => {
    getDefaults(setProblems);
  }, [problems]);

  return (
    <div className="defaults-container">
      <Header
        profileCss="profileDefaultsAdmin"
        loginCss="loginDefaultsAdmin"
        logoutCss="logoutDefaultsAdmin"
      />
      <div className="defaults-display">
        {problems &&
          (problems.length === 0 ? (
            <div className="defaultAdminEmpty">
              <h1> Pas de défaut posté à ce jour</h1>
              <Button
                name="home"
                classButton="home-button"
                fieldButton="retour à l'accueil"
                type="button"
                onClick={(e) => nav(e)}
              />
            </div>
          ) : (
            <>
              {problems.map((problem) => (
                <div className="map-container" key={problem.id_default}>
                  <DefaultCard
                    stateContainer={problem.treatment}
                    station={problem.station}
                    tgv={problem.tgv_number}
                    ter={problem.ter_number}
                    track={problem.railway_track_number}
                    description={problem.description}
                    image={problem.picture}
                    imgAlt="image du defaut"
                    latitude={problem.latitude}
                    longitude={problem.longitude}
                    id_default={problem.id_default}
                    traitement={problem.treatment}
                    cp={problem.cp}
                  />

                  <Button
                    name="delete"
                    classButton="delete-button-defaultAdmin"
                    fieldButton="Supprimer"
                    type="button"
                    onClick={(e) =>
                      deleteDefaults(problem.id_default, setProblems, e)
                    }
                  />
                  <Link to={`/DefaultViewAdmin/${cp}/${problem.id_default}`}>
                    <Button
                      name="update"
                      classButton="update-button-defaultAdmin"
                      fieldButton="Modifier l'état"
                      type="button"
                    />
                  </Link>
                </div>
              ))}
            </>
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default DefaultsAdmin;
