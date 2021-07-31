import React from 'react';
import { Link } from 'react-router-dom';

const SmallLink = ({ href, link, text, title }) => {
  if (href !== "") {
    console.log("test");
    return (
      <a href={href} title={title}>
        {text}
      </a>
    );
  }

  return (
    <Link to={link} title={title}>
      {text}
    </Link>
  );
};

export default SmallLink;
