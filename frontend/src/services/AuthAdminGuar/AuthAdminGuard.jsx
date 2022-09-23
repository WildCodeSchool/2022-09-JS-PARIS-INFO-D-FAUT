import React from "react";
import { Navigate } from "react-router-dom";

const AuthAdminGuard = ({ children }) => {
  const admin = true;
  if (!admin) {
    return <Navigate to="/items" />;
  }
  return children;
};

export default AuthAdminGuard;
