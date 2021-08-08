import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import styles from './NotFound.module.sass';
import audio from './media/music/rick-astley.mp3';

const rickRoll = new Audio(audio);

const PageNotFound = () => {
  const history = useHistory();

  const [playing, setPlayer] = useState(false);
  const classnames = cx(styles.iconSpin, {
    [styles.iconDoSpin]: playing,
  });

  const rickRollToggle = () => {
    if (playing) {
      rickRoll.pause();
    } else {
      rickRoll.play().catch(error => console.error);
    }
    setPlayer(!playing);
  };

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
      <h4>Послушайте лучше музыку</h4>

      <div className={styles.button} onMouseDown={rickRollToggle}>
        <div className={styles.buttonColor}></div>
        <div className={styles.buttonImage}></div>
        <div className={styles.buttonCircle}></div>
      </div>
      <div>
        {playing ? 'Playing ' : 'Paused '}
        <i className={classnames}></i>
      </div>
    </div>
  );
};

export default PageNotFound;
