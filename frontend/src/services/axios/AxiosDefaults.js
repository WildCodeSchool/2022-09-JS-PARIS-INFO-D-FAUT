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

export const getUserDefaultById = (
  id_default,
  setState,
  setState2,
  setState3,
  setState4,
  setState5,
  setState6,
  setState7
) => {
  axios
    .get(`http://localhost:5000/defaults/${id_default}`)
    .then((response) => response.data)
    .then((data) => {
      setState(data);
      setState2(data.station);
      setState3(data.railway_track_number);
      setState4(data.ter_number);
      setState5(data.tgv_number);
      setState6(data.description);
      // setState7(data.picture);
    });
};

export const postDefaults = async (
  data,
  setState2,
  setState3,
  setState4,
  setState5
) => {
  const response = await axios.post(`http://localhost:5000/defaults`, data);
  if (response.data.result) {
    setState2();
    setState3();
    setState4();
    setState5();
  }
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

export const updateDefaults = async (
  id_default,
  data,
  setState,
  setState2,
  setState3,
  setState4,
  setState5,
  setState6
) => {
  const response = await axios.put(
    `http://localhost:5000/defaults/${id_default}`,
    data
  );
  if (response.data.problem) {
    setState();
  }
  setState2("gare :");
  setState3(0);
  setState4(0);
  setState5(0);
  setState6("description");
};
