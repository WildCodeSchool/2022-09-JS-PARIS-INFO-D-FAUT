import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Footer, Header, DefaultCard, Button } from "../../components/index";
import "./DefaultsUser.css";
import {
  deleteDefaults,
  getDefaultsUserById,
} from "../../services/axios/AxiosDefaults";
import { UserContext } from "../../context/index";

const DefaultsUser = () => {
  const { user } = useContext(UserContext);
  const cp = user.cp;
  const id_user = user.id_user;

  const [problem, setProblem] = useState([]);

  useEffect(() => {
    getDefaultsUserById(id_user, setProblem);
  }, []);

  return (
    <div className="defaultsUser-container">
      <Header
        backCss="backDefaultsUser"
        profileCss="profileDefaultsUser"
        loginCss="loginDefaultsUser"
        admin0Css="login0DefaultsUser"
      />
      <div className="fail-container">
        {problem && (
          <>
            {problem.map((problemes) => (
              <div key={problemes.id_default}>
                <DefaultCard
                  station={problemes.station}
                  tgv={problemes.tgv_number}
                  ter={problemes.ter_number}
                  track={problemes.railway_track_number}
                  description={problemes.description}
                  image={problemes.picture}
                  imgAlt="image du defaut"
                  latitude={problemes.latitude}
                  longitude={problemes.longitude}
                  cp={problemes.cp}
                />

                <Button
                  name="delete"
                  classButton="delete-button"
                  champButton="Supprimer"
                  type="button"
                  onClick={(e) =>
                    deleteDefaults(problemes.id_default, setProblem, e)
                  }
                />

                {/* <Link to={`/updateDefaultsUser/${cp}/${problemes.id_default}`}> */}
                <Link to={`/DefaultView/${cp}/${problemes.id_default}`}>
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

export default DefaultsUser;
