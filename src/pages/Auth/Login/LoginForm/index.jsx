import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import FieldError from 'components/ETC/FieldError';
import ButtonLink from 'components/ETC/ButtonLink';
import { loginUserAsync, selectUser } from 'app/slices/userSlice';
import { loginScheme } from 'validation/schemes';

const initialValues = {
  nickname: '',
  password: '',
};

const loginRUSErrors = (errMsg) => {
  if (errMsg === 'Invalid credentials') { return 'Неверный логин или пароль 🔐'; }

  if (errMsg === 'Need to confirm email first') {
    return 'Сначала подтвердите электронную почту. Если письмо не пришло то обратитесь к администрации';
  }

  if (errMsg === 'Server is switched off' ||
    errMsg === 'Server database is switched off' || errMsg === 'Server Error') {
    return 'Ошибка отправки данных. Похоже что бэк-сервер в отключке 😴. Пожалуйста сообщите админу.';
  }
};

const LoginForm = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <>
      {user.status === 'error' ? (
        <div style={{ color: '#aa4400' }}>
          {loginRUSErrors(user.errorMessage)}
        </div>
      ) : (
        <div></div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={loginScheme}
        onSubmit={(values, formikBag) => {
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
              name='password'
              errors={errors}
              touched={touched}
              tag='div'
              text='Пароль'
            >
              <Field type='password' name='password' />
            </FieldError>

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
