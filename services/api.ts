import endpoint from "@/constants/apiEndpoint";
import axios from "axios";

const api = axios.create({
  baseURL: `${endpoint.base}`,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (
      error?.response?.status &&
      error?.response?.status >= 400 &&
      error?.response?.status < 500
    ) {
      if (error?.response?.status === 401) {
        sessionStorage.clear();
      }

      //return message in catch
      const errorMessage =
        error?.response?.data || "Oops, something xc!";
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
