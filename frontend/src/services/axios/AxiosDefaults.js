import axios from "axios";

export const getDefaults = (setState) => {
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };

  axios
    .get("http://localhost:5000/defaults", config)
    .then((response) => response.data)

    .then((data) => {
      setState(data.result);
    })
    .catch((error) => {
      console.warn(error);
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
    })
    .catch((error) => {
      console.warn(error);
    });
};

export const getDefaultView = (id_default, setState) => {
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };
  axios
    .get(`http://localhost:5000/updateDefaultUser/${id_default}`, config)
    .then((response) => response.data)
    .then((data) => {
      setState(data);
    })
    .catch((error) => {
      console.warn(error);
    });
};

export const postDefaults = (data) => {
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };

  axios
    .post(`http://localhost:5000/defaults`, data, config)
    .then((response) => response.data)
    .catch((error) => {
      console.warn(error);
    });
};

export const deleteDefaults = (id_default) => {
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };
  axios
    .delete(`http://localhost:5000/defaults/${id_default}`, config)
    .then((response) => response.data)
    .catch((error) => {
      console.warn(error);
    });
};

export const updateDefault = (id_default, data) => {
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };
  axios
    .put(`http://localhost:5000/defaults/${id_default}`, data, config)
    .then((response) => response.data)
    .catch((error) => {
      console.warn(error);
    });
};

export const postEmail = () => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  axios
    .post(`http://localhost:5000/remit`, {}, config)
    .then((response) => response.data)
    .catch((error) => {
      console.warn(error);
    });
};
