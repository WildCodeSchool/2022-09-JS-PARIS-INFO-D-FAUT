import axios from "axios";

export const postCreateUser = (data) => {
  axios
    .post(`http://localhost:5000/createUser`, data)
    .then((response) => response.data);
};

export const getUsers = (setState) => {
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };
  axios
    .get("http://localhost:5000/users", config)
    .then((response) => response.data)
    .then((data) => {
      setState(data.result);
    });
};

export const deleteUser = (id_user) => {
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };
  axios
    .delete(`http://localhost:5000/users/${id_user}`, config)
    .then((response) => response.data);
};

export const updateUser = (id_user, data) => {
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };
  axios
    .put(`http://localhost:5000/users/${id_user}`, data, config)
    .then((response) => response.data);
};
