import axios from "axios";

export const postProfile = async (
  data,
  setState,
  setState2,
  setState3,
  setState4,
  setState5
) => {
  const response = await axios.post(`http://localhost:5000/users`, data);
  if (response.data.profile) {
    setState();
  }
  setState2("");
  setState3("");
  setState4(0);
  setState5("");
};
