import React, { useEffect, useState } from "react";
import "./Defaults.css";
import axios from "axios";
import { Footer, Header } from "../../components/index";
import { DefaultCard } from "../../components/DefaultCard/DefaultCard";

const Defaults = () => {
  const [problem, setProblem] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/defaults")
      .then((response) => response.data)

      .then((data) => {
        setProblem(data.result);
      });
  }, []);

  return (
    <div className="defaults-container">
      <Header backCss="backDefaults" profileCss="profileDefaults" />
      <div className="defaults-display">
        {problem && (
          <>
            {problem.map((problems) => (
              <DefaultCard
                key={problems.id_default}
                station={problems.station}
                tgv={problems.tgv_number}
                ter={problems.ter_number}
                track={problems.railway_track_number}
                description={problems.description}
                image={problems.picture}
                imgAlt="image du defaut"
                geoloc={problems.geolocation}
              />
            ))}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Defaults;
