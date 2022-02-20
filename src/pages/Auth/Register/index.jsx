import React from 'react';
import RegisterForm from './RegisterForm';

const RegisterPage = () => {
  return (
    <div>
      <h4>Регистрация</h4>
      <div style={{ fontSize: '1.1em', color: '#cc0000' }}>Сайт находится в Бета версии. Полноценная регистрация сейчас находится только на <a href="https://tfc-survival.ru/">основном сайте</a>.</div>
      <p>При регистрации укажите актуальный адресс эл. почты, и подтвердите по ссылке в письме.</p>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
