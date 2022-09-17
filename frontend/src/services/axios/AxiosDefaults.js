import axios from "axios";

export const getDefaults = (setState) => {
  axios
    .get("http://localhost:5000/defaults")
    .then((response) => response.data)

    .then((data) => {
      setState(data.result);
    });
};

export const getDefaultsUserById = (id_user, setState) => {
  axios
    .get(`http://localhost:5000/defaultsUser/${id_user}`)
    .then((response) => response.data)

    .then((data) => {
      setState(data);
    });
};

export const postDefaults = async (
  data,
  setState,
  setState2,
  setState3,
  setState4
) => {
  const response = await axios.post(`http://localhost:5000/defaults`, data);
  if (response.data.result) {
    setState();
  }
  setState2("");
  setState3("");
  setState4("");
};

export const deleteDefaults = async (id_default, setState) => {
  const response = await axios.delete(
    `http://localhost:5000/defaults/${id_default}`
  );
  if (response.data.problem) {
    setState();
  }
};

export const deleteDefaultsUsers = async (id_default, setState) => {
  const response = await axios.delete(
    `http://localhost:5000/defaultsUser/${id_default}`
  );
  if (response.data.problemUser) {
    setState();
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
