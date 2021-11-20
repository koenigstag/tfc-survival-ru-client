import axios from 'axios';
import _ from 'lodash';
import { baseURL } from './index';
import clientApi from './index';
import { encrypt } from 'services/passTransfer';

// TODO check not needed
/* export const getUser = async (nickname, accessToken, refreshToken) => {
  const response = await client.get(`users/${nickname}/${accessToken}`);

  if (!response) {
    throw new Error('Cannot get user');
  }

  return response.data.data;
}; */

export const registerUser = async ({ user, password, ua }) => {
  const response = await clientApi.post('auth/sign-up', {
    user: _.pick(user, ['nickname', 'email']),
    // TODO more useragent data
    ua,
    passwordCrypt: encrypt(password),
  });

  if (!response) {
    throw new Error('Cannot register user');
  }

  localStorage.setItem('accessToken', response.data.data.tokenPair.access);
  localStorage.setItem('refreshToken', response.data.data.tokenPair.refresh);

  return response.data.data.user;
};

export const loginUser = async ({ nickname, password, ua }) => {
  const response = await clientApi.post('auth/sign-in', {
    nickname: nickname,
    passwordCrypt: encrypt(password),
    ua,
  });

  if (!response) {
    throw new Error('Cannot get user');
  }

  localStorage.setItem('accessToken', response.data.data.tokenPair.access);
  localStorage.setItem('refreshToken', response.data.data.tokenPair.refresh);

  return response.data.data.user;
};

export const refreshUser = async refreshToken => {
  const response = await clientApi.post('auth/refresh', {
    refreshToken,
  });

  if (!response) {
    throw new Error('Cannot get user');
  }

  localStorage.setItem('accessToken', response.data.data.tokenPair.access);
  localStorage.setItem('refreshToken', response.data.data.tokenPair.refresh);

  return response.data.data.user;
};

export const changePass = async ({ nickname, password, oldpassword }) => {
  const response = await clientApi.patch(`users/password/${nickname}`, {
    passwordCrypt: encrypt(password),
    oldpassword,
  });

  if (!response) {
    throw new Error('Cannot change user password');
  }

  return response.data.data;
};

export const linkDiscord = async ({ nickname, discord }) => {
  // TODO accessToken check
  const response = await clientApi.patch(`users/discord/${nickname}`, {
    discord,
  });

  if (!response) {
    throw new Error('Cannot link discord');
  }

  return response.data.data;
};

// TODO access token check
// TODO test api
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
