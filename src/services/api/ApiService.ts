// @ts-ignore
import { cookies } from "brownies";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { BASE_URL } from "../../resources/constants/urls";

export class ApiService {
  axiosInstance: AxiosInstance;

  constructor(config: AxiosRequestConfig = {}) {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: { Accept: "application/json" },

      ...config,
    });

    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      const { accessToken } = cookies;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });
  }
}
