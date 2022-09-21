import axios from "axios";

export const postProfile = async (
  data,
  setState2,
  setState3,
  setState4,
  setState5
) => {
  const response = await axios.post(`http://localhost:5000/users`, data);
  if (response.data) {
    setState2("");
    setState3("");
    setState4(0);
    setState5("");
  }
};

export const getUsers = (setState) => {
  axios
    .get("http://localhost:5000/users")
    .then((response) => response.data)

    .then((data) => {
      setState(data.result);
    });
};

export const deleteUser = async (id_user, setState) => {
  const response = await axios.delete(`http://localhost:5000/users/${id_user}`);
  if (response.data.users) {
    setState();
  }
};
