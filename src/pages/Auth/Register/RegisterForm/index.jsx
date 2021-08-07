import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import FieldError from '@/components/ETC/FieldError';
import { registerUserAsync, selectUser } from '@/app/slices/userSlice';
import { registerScheme } from '@/validation/schemes';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <>
      {user.errorMessage ? <div>{user.errorMessage}</div> : <div></div>}
      <Formik
        initialValues={{
          nickname: '',
          email: '',
          password: '',
          confpassword: '',
        }}
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
    </>
  );
};

export default RegisterForm;
