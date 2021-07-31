import React from 'react';
import Copyright from './Copyright';
import styles from './Footer.module.sass';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Copyright />
    </footer>
  );
}

export default Footer;
