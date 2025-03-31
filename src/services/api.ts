import axios from "axios";

const baseAPI = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseAPI;
