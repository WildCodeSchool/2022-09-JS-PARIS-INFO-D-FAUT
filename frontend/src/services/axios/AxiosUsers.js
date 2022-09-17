import axios from "axios";

export const postProfile = async (data, setState) => {
  const response = await axios.post(`http://localhost:5000/users`, data);
  if (response.data.profile) {
    setState();
  }
};
