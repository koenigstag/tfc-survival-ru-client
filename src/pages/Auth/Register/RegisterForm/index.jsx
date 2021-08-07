import React from 'react';
import { useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import FieldError from '@/components/ETC/FieldError';
import { registerUserAsync } from '@/app/slices/userSlice';
import { registerScheme } from '@/validation/schemes';

const RegisterForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        nickname: '',
        email: '',
        password: '',
        confpassword: '',
      }}
      validationSchema={registerScheme}
      onSubmit={(values, formikBag) => {
        dispatch(registerUserAsync(values));
        console.log(values);
        formikBag.resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field type='text' name='nickname' />
          <FieldError name='nickname' errors={errors} touched={touched} />

          <Field type='email' name='email' />
          <FieldError name='email' errors={errors} touched={touched} />

          <Field type='password' name='password' />
          <FieldError name='password' errors={errors} touched={touched} />

          <Field type='password' name='confpassword' />
          <FieldError name='confpassword' errors={errors} touched={touched} />

          <button type='submit'>Регистрация</button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
