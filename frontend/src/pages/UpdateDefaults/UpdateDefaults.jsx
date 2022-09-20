import React from "react";
import "./UpdateDefaults.css";

import { Geolocalisation } from "../../services/Geolocalisation/Geolocalisation";
import { Footer, Header, Update } from "../../components/index";

const UpdateDefaults = () => {
  return (
    <div className="updateDefaults-container">
      {Geolocalisation()}
      <Header backCss="backUpdateDefaults" profileCss="profileUpdateDefaults" />
      <Update />
      <Footer />
    </div>
  );
};

export default UpdateDefaults;
