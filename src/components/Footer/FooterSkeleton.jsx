import React from 'react';
import { Skeleton } from '@material-ui/lab';
import styles from './Footer.module.sass';

const FooterSkeleton = () => {
  return (
    <footer className={styles.footer}>
      <Skeleton variant='text' width={232} />
    </footer>
  );
};

export default FooterSkeleton;
