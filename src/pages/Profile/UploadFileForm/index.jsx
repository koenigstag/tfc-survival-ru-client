import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';

const UploadFileForm = ({
  text = {},
  sideEffect = async () => {},
  sideEffectDependency = undefined,
  submitFunc = async () => {},
  filePreview = () => {},
  mimeType = 'image/png',
  maxFileSize = 800 * 1024,
}) => {
  const [fileSrc, setFileSrc] = useState(null);

  useEffect(() => {
    sideEffect()
      .then(res => {
        setFileSrc(res);
      })
      .catch(e => {
        console.error(e.message);
      });
  }, [sideEffect, sideEffectDependency]);

  return (
    <Formik
      initialValues={{ file: '' }}
      onSubmit={({ file }, formikBag) => {
        if (!file) {
          return;
        }
        console.log('submit file');

        submitFunc(file).then(res => {
          console.log(res);
          setFileSrc(res);
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

          if (file.type !== mimeType) {
            setFieldError(name, 'Неверный тип файла');
            return;
          }
          if (file.size >= maxFileSize) {
            setFieldError(
              name,
              `Размер файла не может быть больше ${maxFileSize / (1024 * 2)} мб`
            );
            return;
          }

          setFieldValue(name, file);
        };

        return (
          <>
            <fieldset>
              <legend>{text.legend}</legend>
              <Form>
                <div>{text.description}</div>
                <input type='file' name='file' onChange={onChangeFile} />

                <div>
                  <button type='submit' disabled={errors.file || !values.file}>
                    {text.submitBtn}
                  </button>{' '}
                  {errors.file ? errors.file : ''}
                </div>
              </Form>
              <div>{filePreview(fileSrc)}</div>
            </fieldset>
          </>
        );
      }}
    </Formik>
  );
};

export default UploadFileForm;
