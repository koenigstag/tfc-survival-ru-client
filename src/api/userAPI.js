import { client } from './index';

export const getUser = async (nickname, accessToken, refreshToken) => {
  try {
    const user = await client.get('users', {
      params: {
        nickname,
        token: {
          access: accessToken,
          refresh: refreshToken,
        },
      },
    });

    if (!user) {
      throw new Error('Cannot get user');
    }

    return user;
  } catch (error) {
    // TODO error handler
    throw new Error(error.message);
  }
};

export const registerUser = async user => {
  try {
    const response = await client.post('users', {
      user,
    });

    if (!response) {
      throw new Error('Cannot register user');
    }

    return response;
  } catch (error) {
    // TODO error handler
    throw new Error(error.message);
  }
};
