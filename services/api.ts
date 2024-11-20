import endpoint from "@/constants/apiEndpoint";
import { setAuthState } from "@/redux/slices/authSlice";
import { verifyToken } from "@/utils/jwt";
import axios, { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: `${endpoint.base}`,
});


api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const currentDate = Math.floor(Date.now() / 1000);
    const token = localStorage.getItem("token");
    if (Number(verifyToken(token as string)?.exp) < currentDate) {
      localStorage.clear();
      window.location.href = "/login";
    }
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error as Error);
  }
);

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (
      error?.response?.status &&
      error?.response?.status >= 400 &&
      error?.response?.status < 500
    ) {
      if (error?.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
      //return message in catch
      const errorMessage = error?.response?.data || "Oops, something wrong!";
      const customError = new Error(errorMessage);

      customError.name = "API Error";
      customError.stack = error.stack;
      return Promise.reject(customError);
    }

    if (error.toJSON().message === "Network Error") {
      return Promise.reject(new Error("Network Error"));
    }

    if (error?.response.status === 500) {
      return Promise.reject(
        new Error(error?.response?.data || "Oops, something aasd!")
      );
    }
    return Promise.reject(new Error(error?.response.data));
  }
);

export default api;
