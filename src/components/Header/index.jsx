import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import Logo from './Logo';
import NavList from './NavList';
import BurgerMenu from './BurgerMenu';
import ButtonLink from '../ETC/ButtonLink';
import { selectUserData, actionCreators } from '@/app/slices/userSlice';
import styles from './Header.module.sass';

const Header = () => {
  const dispatch = useDispatch();
  const [statusShow, setShow] = useState(false);

  const hideOrShow = () => {
    setShow(!statusShow);
    if (!statusShow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const logout = () => {
    dispatch(actionCreators.logout());
    hideOrShow();
  };

  const hideOnSmallScreen = cx(styles.buttonGroup, {
    [styles.showOnBurgerAction]: statusShow,
  });

  const user = useSelector(selectUserData);

  return (
    <>
      <header
        className={styles.headerMain}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <Logo className={styles.blockLogo} />
        <NavList
          status={statusShow}
          onClick={statusShow ? hideOrShow : () => {}}
        />
        {user.nickname === null ? (
          <div className={hideOnSmallScreen} id='authButtons'>
            <ButtonLink
              link='/account/login'
              text='Войти'
              title='Страница входа в ЛК'
              onClick={statusShow ? hideOrShow : () => {}}
            />
            <ButtonLink
              link='/account/register'
              text='Регистрация'
              title='Страница регистрации на проекте'
              variant='blue'
              onClick={statusShow ? hideOrShow : () => {}}
            />
          </div>
        ) : (
          <div className={hideOnSmallScreen}>
            <ButtonLink
              link='/profile'
              text='Личный кабинет'
              title='Страница ЛК'
              onClick={statusShow ? hideOrShow : () => {}}
            />
            <ButtonLink
              link='/'
              text='Выйти'
              title='Выйти из аккаунта'
              variant='blue'
              onClick={logout}
            />
          </div>
        )}
        <BurgerMenu onClick={hideOrShow} status={statusShow} />
      </header>
      {statusShow && (
        <div
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            top: '50%',
            bottom: 0,
            backgroundColor: '#aaa',
            opacity: '0.75',
            zIndex: 1,
          }}
          onClick={hideOrShow}
        ></div>
      )}
    </>
  );
};

export default Header;
