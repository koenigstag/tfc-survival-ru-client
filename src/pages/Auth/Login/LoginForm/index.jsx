import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import FieldError from '@/components/ETC/FieldError';
import ButtonLink from '@/components/ETC/ButtonLink';
import { loginUserAsync, selectUser } from '@/app/slices/userSlice';
import { loginScheme } from '@/validation/schemes';

const initialValues = {
  nickname: '',
  password: '',
};

const loginRUSErrors = {
  'Invalid nickname or password': 'Неверный логин или пароль 🔐',
  "Cannot read property 'data' of undefined":
    'Ошибка отправки данных. Бэк-сервер в отключке 😴. Пожалуйста сообщите админу.',
};

const LoginForm = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <>
      {user.status === 'error' ? (
        <div>{loginRUSErrors[user.errorMessage]}</div>
      ) : (
        <div></div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={loginScheme}
        onSubmit={(values, formikBag) => {
          //console.log(values);
          dispatch(
            loginUserAsync({
              nickname: values.nickname,
              password: values.password,
            })
          );
          formikBag.resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label>
              <div>Логин</div>
              <Field type='text' name='nickname' />
              <FieldError
                name='nickname'
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

            <ButtonLink
                type='submit'
                text='Логин'
                variant='blue'
                style={{ marginTop: '10px' }}
              />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
