import * as Yup from 'yup';

// TODO 
export const registerScheme = Yup.object().shape({
  nickname: Yup.string()
    .matches(/^[a-z0-9_]{3,16}$/i, 'Не соответствует шаблону')
    .required('Требуемое поле'),
  email: Yup.string()
    .email('Не соответствует формату email')
    // .matches(/^$/, 'Не соответствует шаблону')
    .required('Требуемое поле'),
  password: Yup.string()
    // .matches(/^$/, 'Не соответствует шаблону')
    .required('Требуемое поле'),
  confpassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Пароли должны совпадать'
  ),
});
