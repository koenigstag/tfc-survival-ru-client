import axios from 'axios';
import { baseURL } from './index';
import clientApi from './index';
import { encrypt } from 'utils/passTransfer';

// TODO test api
export const changePass = async ({ nickname, password, oldpassword }) => {
  const response = await clientApi.patch(`users/password/${nickname}`, {
    passwordCrypt: encrypt(password),
    oldpassword,
  });

  if (!response) {
    throw new Error('Cannot change user password');
  }

  return response.data;
};

// TODO test api
export const linkDiscord = async ({ nickname, discord }) => {
  const response = await clientApi.patch(`users/discord/${nickname}`, {
    discord,
  });

  if (!response) {
    throw new Error('Cannot link discord');
  }

  return response.data;
};

export const setSkin = async ({ nickname, accessToken, file }) => {
  const data = new FormData();
  data.append('file', file);
  // data.append('accessToken', accessToken);

  const res = await clientApi.post(`media/skin/${nickname}`, data);

  if (res.status !== 200) {
    throw new Error('Cannot set skin');
  }

  return baseURL + `/static/skins/${nickname}.png`;
};

export const setCape = async ({ nickname, accessToken, file }) => {
  const data = new FormData();
  data.append('file', file);
  data.append('accessToken', accessToken);
  const res = await clientApi.post(`media/cape/${nickname}`, data);

  if (res.status !== 200) {
    throw new Error('Cannot set skin');
  }

  return baseURL + `/static/capes/${nickname}.png`;
};

export const getSkin = async ({ nickname }) => {
  const res = await axios.get(`${baseURL}/static/skins/${nickname}.png`);

  if (res.status !== 200) {
    throw new Error('Cannot get skin');
  }

  return baseURL + `/static/skins/${nickname}.png`;
};

export const getCape = async ({ nickname }) => {
  const res = await axios.get(`${baseURL}/static/capes/${nickname}.png`);

  if (res.status !== 200) {
    throw new Error('Cannot get cape');
  }

  return baseURL + `/static/capes/${nickname}.png`;
};

export const getUserStats = async (page, rows) => {
  const response = await clientApi.get('/users/stats?page=' + page + '&rows=' + rows);

  return response.data.data;
};

export const getUserData = async () => {
  const response = await clientApi.get('/users/data');

  return response.data.data;
};

export const getBannedPlayers = async () => {
  const response = await clientApi.get('/banlist');

  return response.data.data;
}
