import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { setCapeAsync } from '@/app/slices/userSlice';

const initialValues = {
  cape: '',
};

const UploadCapeForm = ({ user }) => {
  const dispatch = useDispatch();

  // load skin
  useEffect(() => {
    // effect
    return () => {
      // cleanup
    };
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, formikBag) => {
        dispatch(
          setCapeAsync({
            nickname: user.data.nickname,
            cape: values.cape,
          })
        );

        formikBag.resetForm();
      }}
    >
      {() => (
        <Form>
          <fieldset>
            <legend>Загрузка плаща</legend>
            <div>Файл плаща в формате png</div>
            <Field type='file' name='cape' />
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};

export default UploadCapeForm;
