import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import FieldError from '@/components/ETC/FieldError';
import {
  selectUser,
  changePassAsync,
  actionCreators,
} from '@/app/slices/userSlice';
import { changePasswordScheme } from '@/validation/schemes';
import ButtonLink from '../../../components/ETC/ButtonLink';

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
            nickname: user.data.nickname,
            password: values.password,
          })
        );
        setTimeout(() => {
          dispatch(actionCreators.logout());
        }, 1000);

        formikBag.resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <label>
            <div>Новый пароль</div>
            <Field type='password' name='password' />
            <FieldError
              name='password'
              errors={errors}
              touched={touched}
              tag={'div'}
            />
          </label>

          <label>
            <div>Подтверждение пароля</div>
            <Field type='password' name='confpassword' />
            <FieldError
              name='confpassword'
              errors={errors}
              touched={touched}
              tag={'div'}
            />
          </label>

          {user.status === 'loading' ? (
            <ButtonLink
              type='submit'
              text='Смена пароля ⌛'
              variant='blue'
              disabled
            />
          ) : (
            <ButtonLink type='submit' text='Смена пароля' variant='blue' />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
