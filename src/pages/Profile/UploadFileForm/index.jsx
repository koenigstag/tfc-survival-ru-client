import React, { useCallback, useEffect, useState } from "react";
import { Form, Formik } from "formik";

const UploadFileForm = ({
  text = {},
  sideEffect = async () => {},
  sideEffectDependency = undefined,
  submitFunc = async () => {},
  filePreview = () => {},
  mimeType = "image/png",
  maxFileSize = 800 * 1024,
}) => {
  const [fileSrc, setFileSrc] = useState(null);

  const requestFile = useCallback(() => {
    sideEffect()
      .then((res) => {
        setFileSrc(res);
      })
      .catch((e) => {
        // TODO show errors in ui
        console.error(e.message);
        setFileSrc(null);
      });
  }, [sideEffect, setFileSrc]);

  useEffect(() => {
    requestFile();
  }, [requestFile]);

  useEffect(() => {
    const id = setInterval(() => {
      requestFile();
      filePreview(fileSrc);
    }, 30000);
    return () => {
      clearInterval(id);
    };
  }, [requestFile, filePreview,fileSrc]);

  return (
    <Formik
      initialValues={{ file: "" }}
      onSubmit={({ file }, formikBag) => {
        if (!file) {
          return;
        }

        submitFunc(file).then((res) => {
          setFileSrc(res);
        });

        formikBag.setFieldValue("file", "");
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
            setFieldError(name, "Неверный тип файла");
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
                <input type="file" name="file" onChange={onChangeFile} />

                <div>
                  <button type="submit" disabled={!values.file || errors.file}>
                    {text.submitBtn}
                  </button>{" "}
                  <span style={{ color: "red" }}>
                    {errors.file ? errors.file : ""}
                  </span>
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
