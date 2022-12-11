import axios from "axios";

const getAllUsers = () => {
  const request = axios.get("/auth/");

  return request;
};

export { getAllUsers };
