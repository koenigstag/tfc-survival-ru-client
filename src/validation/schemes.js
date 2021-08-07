import * as Yup from 'yup';

const nicknameScheme = Yup.string()
  .matches(/^[a-z0-9_]{3,16}$/i, 'Не соответствует шаблону')
  .required('Требуемое поле');
const accessTokenScheme = Yup.string()
  .length(32)
  .matches();
const discordScheme = Yup.string().matches();
const emailScheme = Yup.string()
  .email('Не соответствует формату email')
  // .matches(/^$/, 'Не соответствует шаблону')
  .required('Требуемое поле');
const passwordScheme = Yup.string()
  // .matches(/^$/, 'Не соответствует шаблону')
  .required('Требуемое поле');
const confpasswordScheme = Yup.string().oneOf(
  [Yup.ref('password'), null],
  'Пароли должны совпадать'
);

export const registerScheme = Yup.object().shape({
  nickname: nicknameScheme,
  email: emailScheme,
  password: passwordScheme,
  confpassword: confpasswordScheme,
});

export const loginScheme = Yup.object().shape({
  nickname: nicknameScheme,
  password: passwordScheme,
});

export const pretendScheme = Yup.object().shape({
  nickname: nicknameScheme,
  email: emailScheme,
  discord: discordScheme,
  accessToken: accessTokenScheme,
});
