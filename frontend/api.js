import axios from "axios";
import { jwtDecode } from "jwt-decode";

const baseURL = "http://localhost:8000/api/";

let access = localStorage.getItem("access") || null;
let refresh = localStorage.getItem("refresh") || null;

const api = axios.create({ baseURL });

api.interceptors.request.use(async (config) => {
  if (access) {
    const { exp } = jwtDecode(access);
    if (Date.now() >= exp * 1000) {
      const res = await axios.post(baseURL + "auth/refresh/", { refresh });
      access = res.data.access;
      localStorage.setItem("access", access);
    }
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

export default api;
