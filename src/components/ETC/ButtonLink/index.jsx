import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './ButtonLink.module.sass';

const ButtonLink = ({ link, text, title, type }) => {
  const classnames = cx(styles.buttonLink, {
    [styles.buttonLinkWhite]: (type ? type : 'white') === 'white',
    [styles.buttonLinkBlue]: type === 'blue',
  });
  return (
    <Link to={link} className={classnames} title={title}>
      {text}
    </Link>
  );
};

export default ButtonLink;
