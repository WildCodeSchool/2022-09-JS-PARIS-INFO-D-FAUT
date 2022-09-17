import axios from "axios";

export const getDefaults = (setState) => {
  axios
    .get("http://localhost:5000/defaults")
    .then((response) => response.data)

    .then((data) => {
      setState(data.result);
    });
};

export const getDefaultsUserById = (id, setState) => {
  axios
    .get(`http://localhost:5000/defaultsUser/${id}`)
    .then((response) => response.data)

    .then((data) => {
      setState(data);
    });
};

export const postDefaults = async (data, setState) => {
  const response = await axios.post(`http://localhost:5000/defaults`, data);
  if (response.data.problem) {
    setState();
  }
};

export const deleteDefaults = async (id_default, setState) => {
  const response = await axios.delete(
    `http://localhost:5000/defaults/${id_default}`
  );
  if (response.data.problem) {
    setState(response.data.problem);
  }
};

export const deleteDefaultsUsers = async (id, id_default, setState) => {
  const response = await axios.delete(
    `http://localhost:5000/defaultsUser/${id}/${id_default}`
  );
  if (response.data.problem) {
    setState(response.data.problem);
  }
};

export const updateDefaults = async (id_default, data, setState) => {
  const response = await axios.put(
    `http://localhost:5000/defaults/${id_default}`,
    data
  );
  if (response.data.problem) {
    setState();
  }
};
