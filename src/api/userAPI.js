import axios from 'axios';
import { baseURL, clientApi } from './index';
import { encrypt } from 'services/passTransfer';

// TODO check not needed
/* export const getUser = async (nickname, accessToken, refreshToken) => {
  const user = await client.get(`users/${nickname}/${accessToken}`);

  if (!user) {
    throw new Error('Cannot get user');
  }

  return user;
}; */

export const registerUser = async ({ user, password, ua }) => {
  const response = await clientApi.post('users', {
    // TODO more useragent data
    user,
    ua,
    passwordCrypt: encrypt(password),
  });

  if (!response) {
    throw new Error('Cannot register user');
  }

  return response;
};

export const loginUser = async ({ nickname, password }) => {
  const user = await clientApi.post(`users/${nickname}`, {
    passwordCrypt: encrypt(password),
  });

  if (!user) {
    throw new Error('Cannot get user');
  }

  return user;
};

export const changePass = async ({ nickname, password, oldpassword }) => {
  const user = await clientApi.patch(`users/${nickname}`, {
    passwordCrypt: encrypt(password),
    oldpassword,
  });

  if (!user) {
    throw new Error('Cannot change user password');
  }

  return user;
};

export const linkDiscord = async ({ nickname, discord }) => {
  // TODO accessToken check
  const user = await clientApi.patch(`users/discord/${nickname}`, {
    discord,
  });

  if (!user) {
    throw new Error('Cannot link discord');
  }

  return user;
};

// TODO access token check
// TODO test api
export const setSkin = async ({ nickname, accessToken, file }) => {
  const data = new FormData();
  data.append('file', file);
  data.append('accessToken', accessToken);

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
