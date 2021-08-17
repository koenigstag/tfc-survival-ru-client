import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import FieldError from '@/components/ETC/FieldError';
import { selectUser, changePassAsync } from '@/app/slices/userSlice';
import { changePasswordScheme } from '@/validation/schemes';

const initialValues = {
  password: '',
  confpassword: '',
};

const ChangePasswordForm = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={changePasswordScheme}
      onSubmit={(values, formikBag) => {
        dispatch(
          changePassAsync({
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
              Смена пароля ⌛
            </button>
          ) : (
            <button type='submit'>Смена пароля </button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
