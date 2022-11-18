import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://transmatter-admin.herokuapp.com",

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export default apiClient;
