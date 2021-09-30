import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import FieldError from '@/components/ETC/FieldError';
import ButtonLink from '@/components/ETC/ButtonLink';
import { linkDiscordAsync, selectUser } from '@/app/slices/userSlice';

import { linkDiscordScheme } from '@/validation/schemes';

const initialValues = user => ({
  discord: user.data.discord === null ? '' : user.data.discord,
});

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

const LinkDiscordForm = props => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initialValues(user)}
      validationSchema={linkDiscordScheme}
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

            <FieldError
              name='discord'
              errors={errors}
              touched={touched}
              tag='div'
              text='Тэг Discord аккаунта'
            >
              <Field
                type='text'
                name='discord'
                placeholder={fakeDiscord()}
                disabled={user.data.discord !== null}
              />
            </FieldError>

            <ButtonLink
              variant='blue'
              type='submit'
              text={user.data.discord === null ? 'Привязать' : 'Привязано ✔️'}
              disabled={user.data.discord !== null}
              style={{ marginTop: '10px' }}
            />
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};

export default LinkDiscordForm;
