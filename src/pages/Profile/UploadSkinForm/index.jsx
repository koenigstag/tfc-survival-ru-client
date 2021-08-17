import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { setSkinAsync } from '@/app/slices/userSlice';

const initialValues = {
  skin: '',
};

const UploadSkinForm = ({ user }) => {
  const dispatch = useDispatch();

  // load cape
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
          setSkinAsync({
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
            <legend>Загрузка скина</legend>
            <div>Файл скина в формате png</div>
            <Field type='file' name='skin' />
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};

export default UploadSkinForm;
