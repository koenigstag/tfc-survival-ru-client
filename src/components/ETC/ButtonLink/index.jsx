import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './ButtonLink.module.sass';

const ButtonLink = ({ href, link, text, type, ...rest }) => {
  const classnames = cx(styles.buttonLink, {
    [styles.buttonLinkWhite]: (type ? type : 'white') === 'white',
    [styles.buttonLinkBlue]: type === 'blue',
  });

  if (href) {
    return (
      <a
        href={href}
        className={classnames}
        target="_blank"
        rel="noreferrer"
      >
        {text}
      </a>
    );
  }

  return (
    <Link to={link} className={classnames} {...rest}>
      {text}
    </Link>
  );
};

export default ButtonLink;
