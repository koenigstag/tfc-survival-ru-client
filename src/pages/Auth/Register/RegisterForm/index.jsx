import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import FieldError from '@/components/ETC/FieldError';
import {
  registerUserAsync,
  selectUser,
  actionCreators,
} from '@/app/slices/userSlice';
import { registerScheme } from '@/validation/schemes';

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
        <div>{registrationRUSErrors[user.errorMessage]}</div>
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
            <label>
              <div>Никнейм</div>
              <Field type='text' name='nickname' />
              <FieldError
                name='nickname'
                errors={errors}
                touched={touched}
                tag={'div'}
              />
            </label>

            <label>
              <div>Эл. почта</div>
              <Field type='text' name='email' />
              <FieldError
                name='email'
                errors={errors}
                touched={touched}
                tag={'div'}
              />
            </label>

            <label>
              <div>Пароль</div>
              <Field type='password' name='password' />
              <FieldError
                name='password'
                errors={errors}
                touched={touched}
                tag={'div'}
              />
            </label>

            <label>
              <div>Повтор пароля</div>
              <Field type='password' name='confpassword' />
              <FieldError
                name='confpassword'
                errors={errors}
                touched={touched}
                tag={'div'}
              />
            </label>

            {user.status === 'loading' ? (
              <button type='submit' disabled>
                Регистрация ⌛
              </button>
            ) : (
              <button type='submit'>Регистрация </button>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
