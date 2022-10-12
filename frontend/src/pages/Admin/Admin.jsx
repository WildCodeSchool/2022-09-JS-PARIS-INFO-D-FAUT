import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import { Footer, Header, Button } from "../../components/index";
import { UserContext } from "../../context/index";

const Admin = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="admin-container">
      <Header
        profileCss="profileAdmin"
        loginCss="loginAdmin"
        logoutCss="logoutAdmin"
      />
      <div className="admin-display">
        <Link className="link" to="/admin/defaults">
          <Button
            name="defaults"
            classButton="defaults-button"
            fieldButton="voir les defauts"
            type="button"
          />
        </Link>

        <Link className="link" to="/admin/users">
          <Button
            name="users"
            classButton="users-button"
            fieldButton="voir les users"
            type="button"
          />
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
