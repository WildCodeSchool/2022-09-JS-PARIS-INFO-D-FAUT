import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/index";

// const test = () => {
//   const { user } = useContext(UserContext);
//   const cp = user.cp;
//   console.log(cp)
// }
// test();

const AuthAdminGuard = ({ children }) => {
  const { user } = useContext(UserContext);
  const admin = user.admin;
  const cp = user.cp;

  // const logout = async () => {
  //   // e.preventDefault();
  //   const token = localStorage.getItem("token");

  //   const config = { headers: { Authorization: `Bearer ${token}` } };

  //   const bodyParameters = {
  //     key: "value",
  //   };

  //   const response = await axios.post(
  //     `http://localhost:5000/logout`,
  //     bodyParameters,
  //     config
  //   );
  //   // nav();
  //   localStorage.removeItem("token");
  // };

  // if (user === undefined){
  //   return <Navigate to={`/home/${cp}`} />;
  // }

  if (admin !== 1) {
    // console.log("cp", cp)
    // logout();
    return <Navigate to="/" />;
  }
  return children;
};

export default AuthAdminGuard;
