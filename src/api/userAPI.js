import { client } from './index';
import { encrypt } from '@/utils/passTransfer';

export const getUser = async (nickname, accessToken, refreshToken) => {
  const user = await client.get(`users/${nickname}/${accessToken}`);

  if (!user) {
    throw new Error('Cannot get user');
  }

  return user;
};

export const registerUser = async ({ user, password }) => {
  const response = await client.post('users', {
    user,
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
