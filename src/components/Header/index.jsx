import React, { useState } from 'react';
import Logo from './Logo';
import NavList from './NavList';
import ButtonLink from '../ETC/ButtonLink';
import BurgerMenu from './BurgerMenu';
import cx from 'classnames';
import styles from './Header.module.sass';

const Header = () => {
  const [statusShow, setShow] = useState(false);
  const classNames = cx(styles.buttonGroup, {
    [styles.showOnBurgerAction]: statusShow,
  });

  return (
    <header className={styles.headerMain}>
      <Logo className={styles.blockLogo} />
      <NavList status={statusShow} />
      <div className={classNames} id='authButtons'>
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
      <BurgerMenu action={setShow} status={statusShow} />
    </header>
  );
};

export default Header;
