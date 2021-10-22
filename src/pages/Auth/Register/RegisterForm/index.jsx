import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import FieldError from 'components/ETC/FieldError';
import ButtonLink from 'components/ETC/ButtonLink';
import {
  registerUserAsync,
  selectUser,
  actionCreators,
} from 'app/slices/userSlice';
import { registerScheme } from 'validation/schemes';

const initialValues = {
  nickname: '',
  email: '',
  password: '',
  confpassword: '',
};

const registrationRUSErrors = {
  'Nickname is already in use': 'Никнейм уже зарегистрирован',

  "Cannot read property 'data' of undefined":
    'Ошибка отправки данных. Бэк-сервер в отключке 😴. Пожалуйста сообщите админу.',
  'Server database is switched off':
    'Ошибка отправки данных. Бэк-сервер в отключке 😴. Пожалуйста сообщите админу.',

  'Only 3 accounts permitted on 1 email':
    'Уже зарегистрировано 3 аккаунта. Куда еще больше❓',
  'Only 3 accounts permitted on 1 ip address':
    'Уже зарегистрировано 3 аккаунта. Куда еще больше❓',
};

const RegisterForm = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // effect
    async function fetchIP () {
      const IP = await fetch('https://api.ipify.org/?format=json').then(
        response => response.json()
      );

      dispatch(actionCreators.setUserData({ ua: { ...IP } }));
    }
    fetchIP();
    return () => {
      // cleanup
    };
  }, [dispatch]);

  return (
    <>
      {user.status === 'error' ? (
        <div style={{ color: '#aa4400' }}>
          {registrationRUSErrors[user.errorMessage]}
        </div>
      ) : (
        <div></div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={registerScheme}
        onSubmit={(values, formikBag) => {
          const copy = { ...values };
          const password = copy.password;
          delete copy.password;
          delete copy.confpassword;

          dispatch(
            registerUserAsync({ user: copy, password, ua: user.data.ua })
          );
          formikBag.resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <FieldError
              name='nickname'
              errors={errors}
              touched={touched}
              tag='div'
              text='Логин/Ник'
            >
              <Field type='text' name='nickname' autoFocus />
            </FieldError>

            <FieldError
              name='email'
              errors={errors}
              touched={touched}
              tag='div'
              text='Email'
            >
              <Field type='text' name='email' />
            </FieldError>

            <FieldError
              name='password'
              errors={errors}
              touched={touched}
              tag='div'
              text='Пароль'
            >
              <Field type='password' name='password' />
            </FieldError>

            <FieldError
              name='confpassword'
              errors={errors}
              touched={touched}
              tag='div'
              text='Подтверждение пароля'
            >
              <Field type='password' name='confpassword' />
            </FieldError>

            {user.status === 'loading' ? (
              <ButtonLink
                type='submit'
                text='Регистрация ⌛'
                variant='blue'
                style={{ marginTop: '10px' }}
              />
            ) : (
              <ButtonLink
                type='submit'
                text='Регистрация'
                variant='blue'
                style={{ marginTop: '10px' }}
              />
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
