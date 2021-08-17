import React from 'react';
import { useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import FieldError from '@/components/ETC/FieldError';
import ButtonLink from '@/components/ETC/ButtonLink';
import { changePassAsync, actionCreators } from '@/app/slices/userSlice';
import { changePasswordScheme } from '@/validation/schemes';

const initialValues = {
  oldpassword: '',
  password: '',
  confpassword: '',
};

const ChangePasswordForm = ({ user }) => {
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
            oldpassword: values.oldpassword,
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
          <fieldset>
            <legend>Смена пароля</legend>

            <FieldError
              name='oldpassword'
              errors={errors}
              touched={touched}
              tag='div'
              text='Старый пароль'
            >
              <Field type='password' name='oldpassword' />
            </FieldError>

            <FieldError
              name='password'
              errors={errors}
              touched={touched}
              tag='div'
              text='Новый пароль'
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
                text='Смена пароля ⌛'
                variant='blue'
                disabled
              />
            ) : (
              <ButtonLink
                type='submit'
                text='Сменить пароль'
                variant='blue'
                style={{ marginTop: '10px' }}
              />
            )}
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
