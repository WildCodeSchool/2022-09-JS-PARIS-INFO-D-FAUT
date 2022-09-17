import React, { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Footer, Header, DefaultCard, Button } from "../../components/index";
import "./DefaultsUser.css";
import {
  deleteDefaultsUsers,
  getDefaultsUserById,
} from "../../services/axios/AxiosDefaults";
import { ProfileContext } from "../../context/index";

const DefaultsUser = () => {
  const { id_user } = useContext(ProfileContext);

  const [problemUser, setProblemUser] = useState([]);

  useEffect(() => {
    getDefaultsUserById(id_user, setProblemUser);
  }, []);

  return (
    <div className="defaultsUser-container">
      <Header backCss="backDefaultsUser" profileCss="profileDefaultsUser" />
      <div className="fail-container">
        {problemUser && (
          <>
            {problemUser.map((problemes) => (
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
                />

                <Button
                  name="delete"
                  classButton="delete-button"
                  champButton="Supprimer"
                  type="button"
                  onClick={(e) =>
                    deleteDefaultsUsers(problemes.id_default, setProblemUser, e)
                  }
                />
                <Link
                  to={`/updateDefaultsUser/${id_user}/${problemes.id_default}`}
                >
                  <Button
                    name="update"
                    classButton="update-button"
                    champButton="Mettre à jour"
                    type="button"
                    // onClick={() => updateDefaults(problems.id_default)}
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
