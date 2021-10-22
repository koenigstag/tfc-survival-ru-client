import axios from 'axios';

export const baseURL = 'http://localhost:5001';
// const baseURL = 'http://tfc-survival.ru:5001';

export const clientApi = axios.create({
  baseURL: `${baseURL}/api/`,
});

export const mapURL = 'http://tfc-survival.ru:8154/';
