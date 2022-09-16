import axios from "axios";

export const deleteDefaults = async (id, id_default, setState) => {
  const response = await axios.delete(
    `http://localhost:5000/defaultsUser/${id}/${id_default}`
  );
  if (response.data.problem) {
    setState(response.data.problem);
  }
};

export const getDefaultsUserById = (id, setState) => {
  axios
    .get(`http://localhost:5000/defaultsUser/${id}`)
    .then((response) => response.data)

    .then((data) => {
      setState(data);
    });
};
