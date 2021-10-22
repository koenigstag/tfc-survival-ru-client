import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { getSkin, setSkin } from 'api/userAPI';
import { baseURL } from 'api';

const initialValues = {
  skin: '',
};

const UploadSkinForm = ({ user }) => {
  const [skinSrc, setSkinSrc] = useState(null);

  useEffect(() => {
    getSkin({ nickname: user.data.nickname })
      .then(res => {
        setSkinSrc(res);
      })
      .catch(e => {
        // console.error(e);
      });
  }, [user.data.nickname]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, formikBag) => {
        if (!values.skin) {
          return;
        }

        setSkin({
          nickname: user.data.nickname,
          accessToken: user.data.accessToken,
          file: values.skin,
        })
          .then(res => {
            setSkinSrc(res);
          })
          .catch(e => {
            // console.error(e);
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
                <legend>Загрузка скина</legend>
                <div>Файл скина в формате png</div>
                <input type='file' name='skin' onChange={onChangeFile} />
                <div>
                  <button type='submit' disabled={errors.skin || !values.skin}>
                    Установить
                  </button>{' '}
                  {errors.skin ? errors.skin : ''}
                </div>
                <div>
                  {skinSrc === null ? (
                    <img
                      style={style}
                      src={`${baseURL}/static/skins/steve.png`}
                      alt='default skin'
                    />
                  ) : (
                    <img style={style} src={skinSrc} alt='user skin' />
                  )}
                </div>
              </fieldset>
            </Form>
            <iframe title="render 3d" src="https://minerender.org/embed/skin/?skin=MiniDigger&shadow=true" frameborder="0"></iframe>
          </>
        );
      }}
    </Formik>
  );
};

export default UploadSkinForm;
