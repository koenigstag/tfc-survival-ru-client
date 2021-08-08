import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './NotFound.module.sass';
const RickRoll = React.lazy(() => import('./RickRoll'));

const PageNotFound = () => {
  const history = useHistory();

  useEffect(() => {
    // effect
    history.push('/404');

    return () => {
      // cleanup
    };
  }, [history]);

  return (
    <div className={styles.pageNotFound}>
      <h1>404 - Страница не найдена</h1>
      <RickRoll />
    </div>
  );
};

export default PageNotFound;
