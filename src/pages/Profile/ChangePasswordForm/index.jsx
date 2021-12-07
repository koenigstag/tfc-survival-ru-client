import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import FieldError from 'components/ETC/FieldError';
import ButtonLink from 'components/ETC/ButtonLink';
import { changePassAsync, selectUser } from 'app/slices/userSlice';
import { changePasswordScheme } from 'validation/schemes';

const initialValues = {
  oldpassword: '',
  password: '',
  confpassword: '',
};

const changePassRUSErrors = (errorMessage) => {
  if (errorMessage === 'Invalid credentials') {
    return 'Неверный пароль'
  }
  return 'Error'
}

const save = { user: null }

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  save.user = user;

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={changePasswordScheme}
        onSubmit={(values, formikBag) => {
          dispatch(
            changePassAsync({
              nickname: save.user.data.nickname,
              password: values.password,
              oldpassword: values.oldpassword,
            })
          );

          /* setTimeout(() => {
            if (save.user.status === 'idle') {
              dispatch(actionCreators.logout());
            }
          }, 2000); */

          formikBag.resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <fieldset>
              <legend>Смена пароля</legend>
              {user.status === 'error' ? (
                <div style={{ color: '#aa4400' }}>
                  {changePassRUSErrors(user.errorMessage)}
                </div>
              ) : (
                <div></div>
              )}
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
    </>
  );
};

export default ChangePasswordForm;
