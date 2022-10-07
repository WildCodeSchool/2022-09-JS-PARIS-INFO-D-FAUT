import axios from "axios";

export const postCreateUser = async (
  data,
  setState2,
  setState3,
  setState4,
  setState5,
  setState6
) => {
  const response = await axios.post(`http://localhost:5000/createUser`, data);
  if (response.data) {
    setState2("");
    setState3("");
    setState4(0);
    setState5("");
    setState6("");
  }
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

export const deleteUser = async (id_user, setState) => {
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.delete(
    `http://localhost:5000/users/${id_user}`,
    config
  );
  if (response.data.users) {
    setState();
  }
};

export const updateUser = async (id_user, data, setState, setState2) => {
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(
    `http://localhost:5000/users/${id_user}`,
    data,
    config
  );
  setState("");
  setState2("");
};
