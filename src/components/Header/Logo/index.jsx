import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'logo_small.png';
import styles from './Logo.module.sass';

const Logo = () => {
  return (
    <Link to='/' className={styles.logoWrapper + " logo"}>
      <img src={logo} alt='TFC Survival Logo' />
      <span>TFC-survival</span>
    </Link>
  );
};

export default Logo;
