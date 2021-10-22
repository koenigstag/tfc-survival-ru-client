import { client } from './index';
import { encrypt } from '@/services/passTransfer';

// TODO check if needed
export const getUser = async (nickname, accessToken, refreshToken) => {
  const user = await client.get(`users/${nickname}/${accessToken}`);

  if (!user) {
    throw new Error('Cannot get user');
  }

  return user;
};

export const registerUser = async ({ user, password, ua }) => {
  const response = await client.post('users/register', {
    // TODO useragent
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
  const user = await client.post(`users/${nickname}/login`, {
    passwordCrypt: encrypt(password),
  });

  if (!user) {
    throw new Error('Cannot get user');
  }

  return user;
};

export const changePass = async ({ nickname, password, oldpassword }) => {
  const user = await client.patch(`users/${nickname}/password`, {
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
  const user = await client.patch(`users/${nickname}/discord/`, {
    discord,
  });

  if (!user) {
    throw new Error('Cannot link discord');
  }

  return user;
};

export const setSkin = async ({ nickname, skin }) => {
  // TODO accessToken check
  const user = await client.patch(`users/${nickname}/skin`, {
    skin,
  });

  if (!user) {
    throw new Error('Cannot set new skin');
  }

  return user;
};

