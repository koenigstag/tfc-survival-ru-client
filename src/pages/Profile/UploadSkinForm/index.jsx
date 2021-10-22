import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { client } from '@/api';
import { setSkinAsync } from '@/app/slices/userSlice';

const initialValues = {
  skin: '',
};

const UploadSkinForm = ({ user }) => {
  // console.log(client) // check if client has baseURL field 
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
            skin: values.skin,
          })
        );

        formikBag.resetForm();
      }}
    >
      {() => (
        <Form>
          <fieldset>
            <legend>Загрузка скина</legend>
            <label>Файл скина в формате png
              <Field type='file' name='skin' />
            </label>
            
            <div style={{ maxWidth: '300px' }}>
              <img src={ client.baseURL + user.data.skin ? user.data.skin : '/skins/steve.png'} alt="skin preview" />
            </div>
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};

export default UploadSkinForm;
