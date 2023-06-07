import axios from "axios";

const BASE_URL = "http://localhost:5000/v1/api";

const getToken = () => localStorage["token"] || document.cookie.split("=")[1];

export const createApiClient = (endPoint, needAuth = false) => {
  const axiosClient = axios.create({
    baseURL: BASE_URL + endPoint,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (needAuth) {
    const token = getToken();
    console.log({ token });
    axiosClient.interceptors.request.use(async (config) => {
      return {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    });
  }

  return axiosClient;
};
