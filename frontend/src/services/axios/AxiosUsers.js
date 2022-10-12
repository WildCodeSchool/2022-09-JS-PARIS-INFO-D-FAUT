import axios from "axios";

export const postCreateUser = (
  data,
  setErrorConnectFalse,
  alertSuccess,
  durationNav,
  setErrorConnect
) => {
  axios
    .post(`http://localhost:5000/createUser`, data)
    .then((response) => {
      setErrorConnectFalse(false);
      alertSuccess();
      durationNav();
    })
    .catch((error) => {
      setErrorConnect(true);
    });
};

export const postUser = (
  data,
  setErrorConnectFalse,
  setUser,
  durationNav,
  setErrorConnect
) => {
  axios
    .post(`http://localhost:5000/login`, data)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem("token", token);
      setErrorConnectFalse(false);
      setUser(response.data.user);
      durationNav();
    })
    .catch((error) => {
      setErrorConnect(true);
    });
};

export const getUsers = (setState) => {
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };
  axios
    .get("http://localhost:5000/users", config)
    .then((response) => response.data)
    .then((data) => {
      setState(data.result);
    })
    .catch((error) => {
      console.warn(error);
    });
};

export const deleteUser = (id_user) => {
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };
  axios
    .delete(`http://localhost:5000/users/${id_user}`, config)
    .then((response) => response.data)
    .catch((error) => {
      console.warn(error);
    });
};

export const updateUser = (
  id_user,
  data,
  setErrorConnectFalse,
  alertSuccess,
  durationNav,
  setErrorConnect
) => {
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };
  axios
    .put(`http://localhost:5000/users/${id_user}`, data, config)
    .then((response) => {
      setErrorConnectFalse(false);
      alertSuccess();
      durationNav();
    })
    .catch((error) => {
      setErrorConnect(true);
    });
};
