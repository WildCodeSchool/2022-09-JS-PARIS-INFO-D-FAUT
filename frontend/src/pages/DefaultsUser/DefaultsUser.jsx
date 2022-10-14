import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Header, DefaultCard, Button } from "../../components/index";
import "./DefaultsUser.css";
import {
  deleteDefaults,
  getAllDefaultsUser,
} from "../../services/axios/AxiosDefaults";
import { UserContext } from "../../context/index";

const DefaultsUser = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const cp = user.cp;
  const id_user = user.id_user;

  const [problems, setProblems] = useState([]);

  const nav = () => {
    navigate(`/home/${cp}`);
  };

  useEffect(() => {
    getAllDefaultsUser(id_user, setProblems);
  }, [problems]);

  return (
    <div className="defaultsUser-container">
      <Header
        profileCss="profileDefaultsUser"
        loginCss="loginDefaultsUser"
        adminOffCss="adminOffDefaultsUser"
        logoutCss="logoutDefaultsUser"
      />
      {problems &&
        (problems.length === 0 ? (
          <div className="problem-containerOff">
            <div className="defaultUserEmpty">
              <h1> Vous n'avez pas encore posté de défaut</h1>
              <Button
                name="home"
                classButton="home-button"
                fieldButton="retour à l'accueil"
                type="button"
                onClick={(e) => nav(e)}
              />
            </div>
          </div>
        ) : (
          <div className="problem-containerOn">
            {problems.map((problem) => (
              <div key={problem.id_default}>
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
                  cp={problem.cp}
                  traitement={problem.treatment}
                />

                <Button
                  name="delete"
                  classButton="delete-button-defaultsUser"
                  fieldButton="Supprimer"
                  type="button"
                  onClick={(e) => deleteDefaults(problem.id_default, e)}
                />

                <Link to={`/DefaultView/${cp}/${problem.id_default}`}>
                  <Button
                    name="update"
                    classButton="update-button-defaultsUser"
                    fieldButton="Modifier"
                    type="button"
                  />
                </Link>
              </div>
            ))}
          </div>
        ))}

      <Footer />
    </div>
  );
};

export default DefaultsUser;
