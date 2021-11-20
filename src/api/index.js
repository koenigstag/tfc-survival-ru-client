import axios from 'axios';
import CONTANTS from '../constants';
import history from '../browserHistory';

export const baseURL = 'http://localhost:5001';
// const baseURL = 'http://tfc-survival.ru:5001';

const clientApi = axios.create({
  baseURL: `${baseURL}/api/`,
});

export const mapURL = 'http://tfc-survival.ru:8154/';

/* interceptors */
clientApi.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem(CONTANTS.ACCESS_TOKEN);
    if (token) {
      config.headers = { ...config.headers, Authorization: "Bearer " + token };
    }
    return config;
  },
  err => Promise.reject(err)
);

clientApi.interceptors.response.use(
  response => {
    if (response.data.token) {
      window.localStorage.setItem(CONTANTS.ACCESS_TOKEN, response.data.token);
    }
    return response;
  },
  err => {
    if (
      err.response.status === 408 &&
      history.location.pathname !== '/account/login' &&
      history.location.pathname !== '/account/register' &&
      history.location.pathname !== '/'
    ) {
      history.replace('/account/login');
    }
    return Promise.reject(err);
  }
);

export default clientApi;
