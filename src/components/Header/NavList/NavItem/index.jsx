import React from 'react';
import SmallLink from '@/components/ETC/SmallLink';

const NavItem = ({ text, link, href, title, ...rest }) => {
  return (
    <li>
      <SmallLink
        link={link}
        href={href}
        text={text}
        title={title}
        {...rest}
      />
    </li>
  );
};

export default NavItem;
