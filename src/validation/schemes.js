import * as Yup from 'yup';

// regexp
const nicknameRegex = /^[a-z0-9_]{3,16}$/i;
const emailRegex = /^\S{1,64}@\S{1,64}\.\S{1,64}$/;
const discordRegex = /^.{2,32}#\d{4}$/;
const tokenRegex = /^\$2[a-z0-9./$]{58}$/i;

// schemes
const nicknameScheme = Yup.string()
  .matches(
    nicknameRegex,
    'Разрешенная длина ника от 3 до 16 символов. Используйте только латинские буквы, числа и символ подчеркивания'
  )
  .required('Требуемое поле');

const emailScheme = Yup.string()
  .email('Не соответствует формату email')
  .matches(emailRegex, 'Не соответствует шаблону')
  .required('Требуемое поле');

const discordScheme = Yup.string().matches(
  discordRegex,
  'Не соответствует шаблону Discord tag'
);

const accessTokenScheme = Yup.string().matches(tokenRegex);

const passwordScheme = Yup.string()
  .matches(
    /^.{8,32}$/,
    'Не соответствует шаблону: минимум 8 символов'
  )
  .matches(/(\d)+/, 'Не соответствует шаблону: должен содержать цифры')
  .matches(/([a-zа-яё\W])+/i, 'Не соответствует шаблону: должен содержать буквы или доп символы')
  .matches(/^([\S])+$/i, 'Не соответствует шаблону: отсутствие пробелов')
  .required('Требуемое поле');

const confpasswordScheme = Yup.string()
  .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
  .required('Повторите пароль');

// forms schemes
export const registerScheme = Yup.object().shape({
  nickname: nicknameScheme,
  email: emailScheme,
  password: passwordScheme,
  confpassword: confpasswordScheme,
});

export const loginScheme = Yup.object().shape({
  nickname: nicknameScheme,
  // password: passwordScheme,
});

export const changePasswordScheme = Yup.object().shape({
  password: passwordScheme,
  confpassword: confpasswordScheme,
});

export const linkDiscordScheme = Yup.object().shape({
  discord: discordScheme,
});

export const pretendScheme = Yup.object().shape({
  nickname: nicknameScheme,
  email: emailScheme,
  discord: discordScheme,
  accessToken: accessTokenScheme,
});
