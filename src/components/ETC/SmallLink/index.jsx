import React from 'react';
import { Link } from 'react-router-dom';

const SmallLink = ({ href, link, text, title, ...rest }) => {
  if (href) {
    return (
      <a href={href} title={title}>
        {text}
      </a>
    );
  }

  return (
    <Link to={link} title={title} {...rest}>
      {text}
    </Link>
  );
};

export default SmallLink;
