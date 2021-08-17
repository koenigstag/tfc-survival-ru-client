import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://localhost:5001/api/',
  // eslint-disable-next-line no-dupe-keys
  // baseURL: 'http://tfc-survival.ru:5001/api/',
});

export const mapURL = 'http://tfc-survival.ru:8154/';
