import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

let csrfToken = "";

// Fetch CSRF token once at app startup
export async function initCSRF() {
  try {
    const res = await axios.get(
      `${API_URL}/api/csrf/`,
      {
        withCredentials: true,
      }
    );

    csrfToken = res.data.csrfToken;
    return csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    throw error;
  }
}

// Axios instance
const api = axios.create({
  baseURL: `${API_URL}/api/`,
  withCredentials: true,
});

// Attach CSRF token to unsafe methods
api.interceptors.request.use(async (config) => {
  const safeMethods = ["get", "head", "options", "trace"];
  if (!safeMethods.includes(config.method)) {
    if (!csrfToken) {
      await initCSRF();
    }
    config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
});

export async function fetchCSRF() {
  return await initCSRF();
}

export default api;
