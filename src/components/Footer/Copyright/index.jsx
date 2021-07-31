import React from 'react';
import SmallLink from '@/components/ETC/SmallLink';
import styles from './Copyright.module.sass';

const Copyright = () => {
  return (
    <span className={styles.copyright}>
      {`© 2021 - TFC-survival.ru - `}
      <SmallLink link='/home/about' text='О нас' title='Описание проекта' />
    </span>
  );
};

export default Copyright;
