import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { loginUserAsync, selectUser } from '@/app/slices/userSlice';
import { loginScheme } from '@/validation/schemes';
import FieldError from '@/components/ETC/FieldError';

const initialValues = {
  nickname: '',
  password: '',
};

const loginRUSErrors = {
  'Invalid nickname or password': 'Неверный логин или пароль',
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
          console.log(values);
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
            <Field type='text' name='nickname' />
            <FieldError
              name='nickname'
              errors={errors}
              touched={touched}
              tag={'div'}
            />

            <Field type='password' name='password' />
            <FieldError
              name='password'
              errors={errors}
              touched={touched}
              tag={'div'}
            />

            <button type='submit'>Логин</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
