import React from 'react';
import RegisterForm from './RegisterForm';

const RegisterPage = () => {
  return (
    <div>
      <h4>Регистрация</h4>
      <div style={{ fontSize: '1.1em', color: '#cc0000' }}>Сайт находится в Бета версии.</div>
      <p>При регистрации укажите актуальный адресс эл. почты, и активируйте аккаунт по ссылке в письме.</p>
      <p>Если письмо не пришло, то проверьте папку Спам.</p>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
