import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Footer, Header, DefaultCard, Button } from "../../components/index";
import "./DefaultsUser.css";

const DefaultsUser = () => {
  const [problemUser, setProblemUser] = useState([]);
  const { id } = useParams();

  const getDefaultsUserById = () => {
    axios
      .get(`http://localhost:5000/defaultsUser/${id}`)
      .then((response) => response.data)

      .then((data) => {
        setProblemUser(data);
      });
  };

  useEffect(() => {
    getDefaultsUserById();
  }, []);

  const deleteDefaults = async (id_default) => {
    const response = await axios.delete(
      `http://localhost:5000/defaultsUser/${id}/${id_default}`
    );
    if (response.data.problem) {
      setProblemUser(response.data.problem);
    }
  };

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
                  onClick={() => deleteDefaults(problemes.id_default)}
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
