import React, { useState } from 'react';
import cx from 'classnames';
import styles from './RickRoll.module.sass';

import audio from './media/music/rick-astley.mp3';

const rickRoll = new Audio(audio);

const RickRoll = () => {
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
  return (
    <>
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
    </>
  );
};

export default RickRoll;
