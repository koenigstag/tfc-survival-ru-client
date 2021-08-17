import React from 'react';
import { useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import FieldError from '@/components/ETC/FieldError';
import ButtonLink from '@/components/ETC/ButtonLink';
import { linkDiscordAsync } from '@/app/slices/userSlice';
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

const LinkDiscordForm = ({ user }) => {
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
            <label>
              <div>Тэг Discord аккаунта</div>
              <Field
                type='text'
                name='discord'
                placeholder={fakeDiscord()}
                disabled={user.data.discord !== null}
              />
              <FieldError
                name='discord'
                errors={errors}
                touched={touched}
                tag='div'
              />
            </label>
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
