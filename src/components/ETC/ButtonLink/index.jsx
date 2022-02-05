import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './ButtonLink.module.sass';

const ButtonLink = ({ style, href, link, text, variant, ...rest }) => {
  const classnames = cx(styles.buttonLink, {
    [styles.buttonLinkWhite]: (variant ? variant : 'white') === 'white',
    [styles.buttonLinkBlue]: variant === 'blue',
    [styles.buttonLinkGreen]: variant === 'green',
  });

  if (href) {
    return (
      <a href={href} className={classnames} style={style} target='_blank' rel='noreferrer'>
        {text}
      </a>
    );
  }

  if (link) {
    return (
      <Link to={link} className={classnames} style={style} {...rest}>
        {text}
      </Link>
    );
  }

  return (
    <button className={classnames} style={style} {...rest}>
      {text}
    </button>
  );
};

export default ButtonLink;
