import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/index";

const AuthAdminGuard = ({ children }) => {
  const { user } = useContext(UserContext);
  const admin = user.admin;

  if (admin !== 1) {
    return <Navigate to="/items" />;
  }
  return children;
};

export default AuthAdminGuard;
