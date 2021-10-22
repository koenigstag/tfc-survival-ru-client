import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { getCape, setCape } from 'api/userAPI';

const initialValues = {
  cape: '',
};

const UploadCapeForm = ({ user }) => {
  const [capeSrc, setCapeSrc] = useState(null);

  useEffect(() => {
    getCape({ nickname: user.data.nickname })
      .then(res => {
        setCapeSrc(res);
      })
      .catch(e => {
        // console.error(e);
      });
  }, [user.data.nickname]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, formikBag) => {
        if (!values.cape) {
          return;
        }

        setCape({
          nickname: user.data.nickname,
          accessToken: user.data.accessToken,
          file: values.cape,
        }).then(res => {
          setCapeSrc(res);
        });

        formikBag.resetForm();
      }}
    >
      {({ values, errors, setFieldValue, setFieldError }) => {
        const onChangeFile = ({
          target: {
            files: [file],
            name,
          },
        }) => {
          if (!file) {
            return;
          }

          if (file.type !== 'image/png') {
            setFieldError(name, 'Неверный тип файла');
            return;
          }
          if (file.size >= 800000) {
            setFieldError(name, 'Размер файла не может быть больше 800кб');
            return;
          }

          setFieldValue(name, file);
        };

        const style = {
          marginTop: '10px',
          maxWidth: '300px',
          // border: '1px solid #555',
          // borderRadius: '5px',
          outline: 'thick double #555',
        };

        return (
          <>
            <Form>
              <fieldset>
                <legend>Загрузка плаща</legend>
                <div>Файл плаща в формате png</div>
                <input type='file' name='cape' onChange={onChangeFile} />

                <div>
                  <button type='submit' disabled={errors.cape || !values.cape}>
                    Установить
                  </button>{' '}
                  {errors.cape ? errors.cape : ''}
                </div>
                <div>
                  {capeSrc === null ? (
                    'Плащ не установлен'
                  ) : (
                    <img style={style} src={capeSrc} alt='user cape' />
                  )}
                </div>
              </fieldset>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default UploadCapeForm;
