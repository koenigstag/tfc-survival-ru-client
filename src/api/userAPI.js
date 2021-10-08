import { client } from './index';
import { encrypt } from '@/services/passTransfer';

// TODO check not needed
/* export const getUser = async (nickname, accessToken, refreshToken) => {
  const user = await client.get(`users/${nickname}/${accessToken}`);

  if (!user) {
    throw new Error('Cannot get user');
  }

  return user;
}; */

export const registerUser = async ({ user, password, ua }) => {
  const response = await client.post('users', {
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
  const user = await client.post(`users/${nickname}`, {
    passwordCrypt: encrypt(password),
  });

  if (!user) {
    throw new Error('Cannot get user');
  }

  return user;
};

export const changePass = async ({ nickname, password, oldpassword }) => {
  const user = await client.patch(`users/${nickname}`, {
    passwordCrypt: encrypt(password),
    oldpassword,
  });

  if (!user) {
    throw new Error('Cannot change user password');
  }

  return user;
};

export const linkDiscord = async ({ nickname, discord }) => {
  const user = await client.patch(`users/discord/${nickname}`, {
    discord,
  });

  if (!user) {
    throw new Error('Cannot link discord');
  }

  return user;
};
