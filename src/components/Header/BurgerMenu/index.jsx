import React from 'react';
import styles from './BurgerMenu.module.sass';

const BurgerMenu = ({ onClick, status }) => {
  return (
    <div className={styles.burgerMenu}>
      <input type='checkbox' id='burgetMenuBox' checked={status} />
      <label htmlFor='burgetMenuBox' onClick={onClick}>
        <div className={styles.burgerIcon}>
          <div></div>
        </div>
      </label>
    </div>
  );
};

export default BurgerMenu;
