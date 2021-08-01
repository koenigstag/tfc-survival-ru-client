import axios from 'axios';

export const client = axios({
  baseURL: 'localhost:5000/api/',
});
