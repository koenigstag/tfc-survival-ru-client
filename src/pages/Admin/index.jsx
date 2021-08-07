import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import FieldError from '@/components/ETC/FormError';
import { selectUser, actionCreators } from '@/app/slices/userSlice';

const AdminPage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <>
      <pre
        dangerouslySetInnerHTML={{
          __html: `User store: \n${JSON.stringify(user, null, 4)}`,
        }}
      ></pre>
      <Formik
        initialValues={{ nickname: '', email: '' }}
        onSubmit={(values, formikBag) => {
          dispatch(actionCreators.setUserData({ ...user.data, ...values }));
          formikBag.resetForm();
        }}
      >
        {({ errors, touched }) => {
          return (
            <>
              <h4>Подставить чужие данные</h4>
              <Form>
                <label>
                  <div>Nickname</div>
                  <Field type='text' name='nickname' />
                  <FieldError
                    name='nickname'
                    errors={errors}
                    touched={touched}
                    tag={'span'}
                  />
                </label>
                <label>
                  <div>Email</div>
                  <Field type='text' name='email' />
                  <FieldError
                    name='email'
                    errors={errors}
                    touched={touched}
                    tag={'span'}
                  />
                </label>
                <label>
                  <div>Access token</div>
                  <Field type='text' name='accessToken' />
                  <FieldError
                    name='accessToken'
                    errors={errors}
                    touched={touched}
                    tag={'span'}
                  />
                </label>
                <label>
                  <div>Discord</div>
                  <Field type='text' name='discord' />
                  <FieldError
                    name='discord'
                    errors={errors}
                    touched={touched}
                    tag={'span'}
                  />
                </label>
                <div>
                  <button type='submit'>Pretend</button>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default AdminPage;
