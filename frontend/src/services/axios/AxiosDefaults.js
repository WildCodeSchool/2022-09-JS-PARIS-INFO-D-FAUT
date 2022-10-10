import axios from "axios";

export const getDefaults = (setState) => {
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };

  axios
    .get("http://localhost:5000/defaults", config)
    .then((response) => response.data)

    .then((data) => {
      setState(data.result);
    });
};

export const getAllDefaultsUser = (id_user, setState) => {
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };

  axios
    .get(`http://localhost:5000/defaultsUser/${id_user}`, config)
    .then((response) => response.data)
    .then((data) => {
      setState(data);
    });
};

export const getDefaultView = (
  id_default,
  setState
  // setState2,
  // setState3,
  // setState4,
  // setState5,
  // setState6,
  // setState7
) => {
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };
  axios
    .get(`http://localhost:5000/updateDefaultUser/${id_default}`, config)
    .then((response) => response.data)
    .then((data) => {
      setState(data);
      // setState2(data.station);
      // setState3(data.railway_track_number);
      // setState4(data.ter_number);
      // setState5(data.tgv_number);
      // setState6(data.description);
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
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const response = await axios.post(
    `http://localhost:5000/defaults`,
    data,
    config
  );
  if (response.data.result) {
    setState2();
    setState3();
    setState4();
    setState5();
  }
};

export const deleteDefaults = async (id_default, setState) => {
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.delete(
    `http://localhost:5000/defaults/${id_default}`,
    config
  );
  if (response.data.problem) {
    setState();
  }
};

export const updateDefault = async (
  id_default,
  data,
  setState
  // setState2
  // setState3,
  // setState4,
  // setState5,
  // setState6,
  // setState7,
  // setState8
) => {
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(
    `http://localhost:5000/defaults/${id_default}`,
    data,
    config
  );
  if (response.data.problem) {
    setState();
  }
  // setState2();
  // setState3(0);
  // setState4(0);
  // setState5(0);
  // setState6("description");
  // setState7("");
  // setState8(null);
};
