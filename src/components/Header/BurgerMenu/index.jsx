import React from 'react';
import styles from './BurgerMenu.module.sass';

const BurgerMenu = ({ action, status }) => {

  return (
    <div className={styles.burgerMenu}>
      <input type='checkbox' id='burgetMenuBox' />
      <label
        htmlFor='burgetMenuBox'
        onClick={() => {
          action(!status);
        }}
      >
        <div className={styles.burgerIcon}>
          <div></div>
        </div>
      </label>
    </div>
  );
};

export default BurgerMenu;
