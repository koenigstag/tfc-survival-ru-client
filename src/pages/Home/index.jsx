import React from 'react';
import logo from '@/logo.png';
import styles from '@/App.module.sass'

const HomePage = () => {
  return (
    <div>
      <img src={logo} className={styles.AppLogo} alt='logo' />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className={styles.AppLink}
        href='https://reactjs.org'
        target='_blank'
        rel='noopener noreferrer'
      >
        Learn React
      </a>
    </div>
  );
};

export default HomePage;
