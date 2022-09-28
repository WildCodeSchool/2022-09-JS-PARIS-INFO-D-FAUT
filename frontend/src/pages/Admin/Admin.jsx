import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import { Footer, Header, Button } from "../../components/index";
import { IdUserContext } from "../../context/index";

const Admin = () => {
  const { id_user } = useContext(IdUserContext);

  return (
    <div className="admin-container">
      <Header backCss="backAdmin" profileCss="profileAdmin" />
      <div className="admin-display">
        <Link className="link" to="/admin/defaults">
          <Button
            name="defaults"
            classButton="defaults-button"
            champButton="voir les defauts"
            type="button"
          />
        </Link>

        <Link className="link" to="/admin/users">
          <Button
            name="users"
            classButton="users-button"
            champButton="voir les users"
            type="button"
          />
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
