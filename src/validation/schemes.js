import * as Yup from 'yup';

// TODO regexp
const nicknameScheme = Yup.string()
  .matches(
    /^[a-z0-9_]{3,16}$/i,
    'Разрешенная длина ника от 3 до 16 символов. Используйте только латинские буквы, числа и символ подчеркивания'
  )
  .required('Требуемое поле');
const accessTokenScheme = Yup.string()
  .length(32)
  .matches();
const discordScheme = Yup.string().matches(
  /^.{2,32}#[0-9]{4}$/,
  'Не соответствует шаблону Discord tag'
);
const emailScheme = Yup.string()
  .email('Не соответствует формату email')
  .matches(/^\S+@\S+\.\S+$/, 'Не соответствует шаблону')
  // TODO test whitelisted email domains
  .test(() => {
    return true;
  })
  .required('Требуемое поле');
const passwordScheme = Yup.string()
  .matches(
    /^(?=.*\d)(?=.*[a-z])[0-9a-z]{6,}$/i,
    'Не соответствует шаблону. Минимум 6 символов: цифр, и латинских букв'
  )
  .required('Требуемое поле');
const confpasswordScheme = Yup.string()
  .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
  .required('Повторите пароль');

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
