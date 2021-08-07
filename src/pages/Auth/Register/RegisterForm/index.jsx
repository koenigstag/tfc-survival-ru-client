import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import FieldError from '@/components/ETC/FieldError';
import { registerUserAsync, selectUser } from '@/app/slices/userSlice';
import { registerScheme } from '@/validation/schemes';

const initialValues = {
  nickname: '',
  email: '',
  password: '',
  confpassword: '',
};

const registrationErrors = {
  'Nickname is already in use': 'Никнейм уже зарегистрирован',
};

const RegisterForm = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <>
      {user.status === 'error' ? (
        <div>{registrationErrors[user.errorMessage]}</div>
      ) : (
        <div></div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={registerScheme}
        onSubmit={(values, formikBag) => {
          console.log(values);
          dispatch(registerUserAsync(values));
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

            <Field type='email' name='email' />
            <FieldError
              name='email'
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

            <Field type='password' name='confpassword' />
            <FieldError
              name='confpassword'
              errors={errors}
              touched={touched}
              tag={'div'}
            />

            <button type='submit'>Регистрация</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
