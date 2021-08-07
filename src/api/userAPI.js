import { client } from './index';

export const getUser = async (nickname, accessToken, refreshToken) => {
  const user = await client.get(`users/${nickname}/${accessToken}`);

  if (!user) {
    throw new Error('Cannot get user');
  }

  return user;
};

export const registerUser = async user => {
  const response = await client.post('users', {
    user,
  });

  if (!response) {
    throw new Error('Cannot register user');
  }

  return response;
};
