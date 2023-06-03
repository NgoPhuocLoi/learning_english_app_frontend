import axios from "axios";

const BASE_URL = "http://localhost:5000/v1/api";

const getToken = () => localStorage["token"];

export const createApiClient = (endPoint, needAuth = false) => {
  const axiosClient = axios.create({
    baseURL: BASE_URL + endPoint,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (needAuth) {
    axiosClient.interceptors.request.use(async (config) => {
      return {
        ...config,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      };
    });
  }

  return axiosClient;
};
