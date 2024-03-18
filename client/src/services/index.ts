import axios from "axios";
import {
  setLocalStorageToken,
  setLocalStorageUser,
} from "./localStorage";
export const API_URL = "https://taskey-1r64.onrender.com/api";

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originRequest._isRetry = true;
      try {
        const { data } = await axios.get(API_URL + "/refresh", {
          withCredentials: true,
        });
        setLocalStorageToken(data.accessToken);
        setLocalStorageUser(data.user._id);
        return api.request(originRequest);
      } catch (error) {
        throw new Error("unauthorized");
      }
    }

    throw error;
  }
);
export default api;