import React from 'react';
import cx from 'classnames';
import { Skeleton } from '@material-ui/lab';
import styles from './Header.module.sass';
import skeletonStyles from './skeleton.module.sass';

const HeaderSkeleton = () => {
  const hideOnSmallScreen = cx(styles.buttonGroup, skeletonStyles.buttonGroup);

  return (
    <header className={styles.headerMain}>
      <div className={skeletonStyles.logoSkeleton}>
        <div className={skeletonStyles.logoImage}>
          <Skeleton variant='circle' width={58} height={58} />
        </div>

        <Skeleton
          variant='text'
          width={90}
          height={32}
          style={{ marginLeft: '10px' }}
        />
      </div>

      <div className={skeletonStyles.navSkeleton}>
        <Skeleton variant='rect' width={700} height={44} />
      </div>

      <div className={hideOnSmallScreen}>
        <div className={skeletonStyles.buttonSkeleton}>
          <Skeleton variant='rect' width={77} height={46} />
        </div>
        <div className={skeletonStyles.buttonSkeleton}>
          <Skeleton variant='rect' width={126} height={46} />
        </div>
      </div>

      <div className={skeletonStyles.burgerSkeleton}>
        <Skeleton variant='rect' width={32} height={32} />
      </div>
    </header>
  );
};

export default HeaderSkeleton;
