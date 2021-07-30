import React from 'react';
import { Link } from 'react-router-dom';

const SmallLink = ({link, text, title}) => {
  return (
    <Link exact to={link} title={title}>
        {text}
      </Link>
  );
}

export default SmallLink;
