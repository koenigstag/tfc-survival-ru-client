import axios from 'axios';
import CONSTANTS from '../constants';
import history from '../browserHistory';
import { removeTokens, refreshUser, saveTokens } from './authAPI';

export const baseURL = `http://${CONSTANTS.SERVER_DOMAIN}`;

const clientApi = axios.create({
  baseURL: `${baseURL}/api/`,
});

export const mapURL = CONSTANTS.mapURL;

/* interceptors */
clientApi.interceptors.request.use(
  config => {
    const accessToken = window.localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
    if (accessToken) {
      config.headers = { ...config.headers, Authorization: 'Bearer ' + accessToken };
    }
    const adminToken = window.localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
    if(adminToken) {
      config.headers = { ...config.headers, "X-Admin-Token": adminToken };
    }

    return config;
  },
  err => Promise.reject(err)
);

clientApi.interceptors.response.use(
  response => {
    if (response.data.data.tokenPair) {
      saveTokens(response.data.data.tokenPair);
    }
    if (response.data.data.adminToken) {
      window.localStorage.setItem(
        CONSTANTS.ADMIN_TOKEN,
        response.data.data.adminToken
      );
    }

    return response;
  },
  async err => {
    if (
      err.response.status === 401 &&
      history.location.pathname !== '/account/login' &&
      history.location.pathname !== '/account/register' &&
      history.location.pathname !== '/'
    ) {
      const refreshToken = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);
      if (refreshToken) {
        try {
          const { tokenPair } = await refreshUser(refreshToken);
          saveTokens(tokenPair);

          err.config.headers = {
            ...err.config.headers,
            Authorization: 'Bearer ' + tokenPair.access,
          };
          return clientApi.request(err.config);
        } catch (error) {
          removeTokens();
          history.replace('/account/login');
        }
      }
    }

    if (
      err.response.status === 419 &&
      history.location.pathname !== '/account/login' &&
      history.location.pathname !== '/account/register' &&
      history.location.pathname !== '/'
    ) {
      removeTokens();
      history.replace('/account/login');
    }
    return Promise.reject(err);
  }
);

export default clientApi;
