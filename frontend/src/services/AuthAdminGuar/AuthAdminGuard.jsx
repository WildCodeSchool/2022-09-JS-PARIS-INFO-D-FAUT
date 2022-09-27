import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../../context/index";

const AuthAdminGuard = ({ children }) => {
  const { admin } = useContext(AdminContext);

  if (admin !== 1) {
    return <Navigate to="/items" />;
  }
  return children;
};

export default AuthAdminGuard;
