import React from "react";
import "./Page404.css";
import error from "../../assets/logo_404.png";

const Page404 = () => {
  return (
    <div className="error-container">
      <img className="logo-error" src={error} alt="logo page 404" />
    </div>
  );
};

export default Page404;
