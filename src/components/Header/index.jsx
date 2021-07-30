import React from 'react';
import styles from './Header.module.sass';
import NavList from './NavList';

const Header = () => {
  return (
    <header className={styles.headerMain}>
      <NavList />
    </header>
  );
};

export default Header;
