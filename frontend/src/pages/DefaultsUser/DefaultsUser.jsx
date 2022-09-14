import React, { useState, useEffect } from "react";
import axios from "axios";
import { Footer, Header, DefaultCard } from "../../components/index";
import "./DefaultsUser.css";
// import { DefaultsContext } from "../../context/DefaultsContext";

const DefaultsUser = () => {
  // const { problem, setProblem } = useContext(DefaultsContext);
  const [problemUser, setProblemUser] = useState([]);
  const getDefaultsUserById = () => {
    // const id_user = 2;
    // const dataUser = { id_user };
    axios
      .get(`http://localhost:5000/defaultsUser/4`)
      .then((response) => response.data)

      .then((data) => {
        setProblemUser(data);
      });
  };

  useEffect(() => {
    getDefaultsUserById();
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

                {/* <Button
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
            /> */}
              </div>
            ))}
          </>
        )}
        ;
      </div>
      <Footer />
    </div>
  );
};

export default DefaultsUser;
