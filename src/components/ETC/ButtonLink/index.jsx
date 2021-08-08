import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './ButtonLink.module.sass';

const ButtonLink = ({ href, link, text, title, type, ...rest }) => {
  const classnames = cx(styles.buttonLink, {
    [styles.buttonLinkWhite]: (type ? type : 'white') === 'white',
    [styles.buttonLinkBlue]: type === 'blue',
  });

  if (href) {
    return (
      <a href={href} className={classnames} title={title}>
        {text}
      </a>
    );
  }

  return (
    <Link to={link} className={classnames} title={title} {...rest}>
      {text}
    </Link>
  );
};

export default ButtonLink;
