import _ from "lodash";
import { encrypt } from "utils/passTransfer";
import clientApi from "api";
import constants from "../constants";

export const registerUser = async ({ user, password, ua }) => {
  const response = await clientApi.post("auth/sign-up", {
    user: _.pick(user, ["nickname", "email"]),
    // TODO more useragent data
    ua,
    passwordCrypt: encrypt(password),
  });

  if (!response.data.data.user) {
    throw new Error("Cannot register user");
  }

  return response.data.data;
};

export const loginUser = async ({ nickname, password, ua }) => {
  const response = await clientApi.post("auth/sign-in", {
    nickname: nickname,
    passwordCrypt: encrypt(password),
    ua,
  });

  if (!response.data.data.user) {
    throw new Error("Cannot login user");
  }

  return response.data.data;
};

export const refreshUser = async (refreshToken) => {
  const response = await clientApi.post("auth/refresh", {
    refreshToken,
  });

  if (!response.data.data.user) {
    throw new Error("Cannot login user");
  }

  return response.data.data;
};

export const saveTokens = (tokenPair) => {
  localStorage.setItem(constants.ACCESS_TOKEN, tokenPair.access);
  localStorage.setItem(constants.REFRESH_TOKEN, tokenPair.refresh);
};

export const removeTokens = () => {
  localStorage.removeItem(constants.ACCESS_TOKEN);
  localStorage.removeItem(constants.REFRESH_TOKEN);
};
