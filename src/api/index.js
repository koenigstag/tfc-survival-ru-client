import axios from "axios";
import CONSTANTS from "../constants";
import history from "../browserHistory";
import { removeTokens, refreshUser, saveTokens } from "./authAPI";

export const baseURL = "http://localhost:5001";
// const baseURL = 'http://tfc-survival.ru:5001';

const clientApi = axios.create({
  baseURL: `${baseURL}/api/`,
});

export const mapURL = "http://tfc-survival.ru:8154/";

/* interceptors */
clientApi.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
    if (token) {
      config.headers = { ...config.headers, Authorization: "Bearer " + token };
    }
    return config;
  },
  (err) => Promise.reject(err)
);

clientApi.interceptors.response.use(
  (response) => {
    if (response.data.data.tokenPair) {
      saveTokens(response.data.data.tokenPair);
    }
    return response;
  },
  async (err) => {
    if (
      err.response.status === 401 &&
      history.location.pathname !== "/account/login" &&
      history.location.pathname !== "/account/register" &&
      history.location.pathname !== "/"
    ) {
      const refreshToken = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);
      if (refreshToken) {
        try {
          const { tokenPair } = await refreshUser(refreshToken);
          saveTokens(tokenPair);

          err.config.headers = {
            ...err.config.headers,
            Authorization: "Bearer " + tokenPair.access,
          };
          clientApi.request(err.config);
          return;
        } catch (error) {
          removeTokens();
          history.replace("/account/login");
        }
      }
    }

    if (
      err.response.status === 419 &&
      history.location.pathname !== "/account/login" &&
      history.location.pathname !== "/account/register" &&
      history.location.pathname !== "/"
    ) {
      removeTokens();
      history.replace("/account/login");
    }
    return Promise.reject(err);
  }
);

export default clientApi;
