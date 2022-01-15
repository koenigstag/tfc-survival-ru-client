// import decode from 'jwt-decode';
import axios from "axios";
import CONSTANTS from "../constants";
import { removeTokens, refreshUser, saveTokens } from "./authAPI";

export const baseURL = `http://${CONSTANTS.SERVER_DOMAIN}`;

const clientApi = axios.create({
  baseURL: `${baseURL}/api/`,
});

/* interceptors */
clientApi.interceptors.request.use(
  (config) => {
    let accessToken = window.localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
    if (accessToken) {

      /* const expires = decode(accessToken).exp

      console.log(expires); */

      config.headers = {
        ...config.headers,
        Authorization: "Bearer " + accessToken,
      };
    }
    const adminToken = window.localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
    if (adminToken) {
      config.headers = { ...config.headers, "X-Admin-Token": adminToken };
    }

    return config;
  },
  (err) => Promise.reject(err)
);

clientApi.interceptors.response.use(
  (response) => {
    if (response?.data?.data?.tokenPair) {
      saveTokens(response.data.data.tokenPair);
    }
    if (response?.data?.data?.adminToken) {
      window.localStorage.setItem(
        CONSTANTS.ADMIN_TOKEN,
        response.data.data.adminToken
      );
    }

    return response;
  },
  async (err) => {
    if (
      err?.response?.status === 401 &&
      window.location.pathname !== "/account/login" &&
      window.location.pathname !== "/account/register" &&
      window.location.pathname !== "/"
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
          return clientApi.request(err.config);
        } catch (error) {
          removeTokens();
          window.history.replaceState(null, "", "/account/login");
        }
      }
    }

    if (
      err?.response?.status === 419 &&
      window.location.pathname !== "/account/login" &&
      window.location.pathname !== "/account/register" &&
      window.location.pathname !== "/"
      ) {
      removeTokens();
      window.history.replaceState(null, "", "/account/login");
    }
    return Promise.reject(err);
  }
);

export default clientApi;
