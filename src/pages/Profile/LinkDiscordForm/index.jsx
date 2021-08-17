import React from 'react';
import { useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import FieldError from '@/components/ETC/FieldError';
import { linkDiscordAsync } from '@/app/slices/userSlice';
import { discordScheme } from '@/validation/schemes';

const initialValues = { discord: '' };

const names = [
  'Евлампий',
  'Дрезин',
  'Гималай',
  'Борзун',
  'Кончитец',
  'Даздраперв',
  'Зюзя',
];

const describe = [
  'Вялый',
  'Борзый',
  'Вездессущий',
  'Тупой',
  'Спящий',
  'Мертвый',
];

const fakeDiscord = () => {
  const tagDescr = describe[Math.floor(Math.random() * describe.length)];
  const tagName = names[Math.floor(Math.random() * names.length)];
  const tagNum = (Math.random() * 10000)
    .toFixed(0)
    .split()
    .slice(0, 3);
  return `${tagDescr} ${tagName}#${tagNum}`;
};

const LinkDiscordForm = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={discordScheme}
      onSubmit={(values, formikBag) => {
        dispatch(
          linkDiscordAsync({
            nickname: user.data.nickname,
            discord: values.discord,
          })
        );

        formikBag.resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <fieldset>
            <legend>Привязка Discord</legend>
            <label>
              <div>Тэг Discord аккаунта</div>
              <Field type='text' name='discord' placeholder={fakeDiscord()} />
              <FieldError
                name='discord'
                errors={errors}
                touched={touched}
                tag='div'
              />
            </label>
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};

export default LinkDiscordForm;
