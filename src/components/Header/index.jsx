import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import ButtonLink from '../ETC/ButtonLink';
import Logo from './Logo';
import NavList from './NavList';
import BurgerMenu from './BurgerMenu';
import { selectUserData } from '@/app/slices/userSlice';
import styles from './Header.module.sass';

const Header = () => {
  const [statusShow, setShow] = useState(false);
  const hideOnSmallScreen = cx(styles.buttonGroup, {
    [styles.showOnBurgerAction]: statusShow,
  });

  const user = useSelector(selectUserData);

  return (
    <header className={styles.headerMain}>
      <Logo className={styles.blockLogo} />
      <NavList status={statusShow} />
      {user.nickname === null ? (
        <div className={hideOnSmallScreen} id='authButtons'>
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
      ) : (
        <div className={hideOnSmallScreen}>
          <ButtonLink
            link='/profile'
            text='Личный кабинет'
            title='Страница ЛК'
          />
          <ButtonLink
            link='/'
            text='Выйти'
            title='Выйти из аккаунта'
            type='blue'
          />
        </div>
      )}
      <BurgerMenu action={setShow} status={statusShow} />
    </header>
  );
};

export default Header;
