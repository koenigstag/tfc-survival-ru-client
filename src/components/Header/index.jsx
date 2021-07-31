import React from 'react';
import ButtonLink from '../ETC/ButtonLink';
import styles from './Header.module.sass';
import Logo from './Logo';
import NavList from './NavList';

const Header = () => {
  return (
    <header className={styles.headerMain}>
      <Logo />
      <NavList />
      <div>
        <ButtonLink
          link='/account/login'
          text='Войти'
          title='Страница входа в ЛК'
        />
        <ButtonLink
          link='/account/register'
          text='Регистрация'
          title='Страница регистрации на проекте'
          type='blue'
        />
      </div>
    </header>
  );
};

export default Header;
