import React from "react";
import "./UpdateDefaultsUser.css";

import { Geolocalisation } from "../../services/Geolocalisation/Geolocalisation";
import { Footer, Header, Update } from "../../components/index";

const UpdateDefaultsUser = () => {
  return (
    <div className="updateDefaultsUser-container">
      {Geolocalisation()}
      <Header
        backCss="backUpdateDefaultsUser"
        profileCss="profileUpdateDefaultsUser"
      />
      <Update />
      <Footer />
    </div>
  );
};

export default UpdateDefaultsUser;
