import axios from "axios";

export const postProfile = async (data, setState, setState2) => {
  const response = await axios.post(`http://localhost:5000/users`, data);
  if (response.data.profile) {
    setState();
  }
  setState2(true);
};
