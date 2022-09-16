import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Footer, Header, DefaultCard, Button } from "../../components/index";
import "./DefaultsUser.css";
import { deleteDefaults, getDefaultsUserById } from "../../utils/axios/axios";

const DefaultsUser = () => {
  const [problemUser, setProblemUser] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getDefaultsUserById(id, setProblemUser);
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
                  id_default={problemes.id_default}
                />

                <Button
                  name="delete"
                  classButton="delete-button"
                  champButton="Supprimer"
                  type="button"
                  onClick={() =>
                    deleteDefaults(id, problemes.id_default, setProblemUser)
                  }
                />

                {/* <Button
              name="update"
              classButton="update-button"
              champButton="Mettre à jour"
              type="button"
              onClick={() => updateDefaults(problems.id_default)}
            /> */}
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
