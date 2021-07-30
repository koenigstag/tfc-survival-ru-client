import React from 'react'
import SmallLink from '@/components/ETC/SmallLink'

const NavItem = ({text, link, title}) => {
  return (
    <li>
      <SmallLink link={link} text={text} title={title}/>
    </li>
  )
}

export default NavItem
