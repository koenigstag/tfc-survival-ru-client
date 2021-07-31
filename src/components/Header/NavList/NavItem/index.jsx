import React from 'react'
import SmallLink from '@/components/ETC/SmallLink'

const NavItem = ({text, link, href, title}) => {
  return (
    <li>
      <SmallLink link={link} href={href} text={text} title={title}/>
    </li>
  )
}

export default NavItem
