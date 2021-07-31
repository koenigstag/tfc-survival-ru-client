import React from 'react';
import cx from 'classnames';
import NavItem from './NavItem';
import styles from './NavList.module.sass';

const navList = [
  { link: '/', text: 'На главную', title: 'Главная страница сайта' },
  {
    link: '/home/launcher',
    text: 'Лаунчер',
    title: 'Скачать лаунчер для игры на сервере',
  },
  { link: '/home/rules', text: 'Правила', title: 'Правила сервера' },
  {
    link: '/home/banned',
    text: 'Банлист',
    title: 'Список забанных игроков и причины банов',
  },
  { link: '/home/online', text: 'Онлайн', title: 'Список игроков онлайн' },
  { href: 'http://tfc-survival.ru:8154', text: 'Карта', title: 'Карта игрового мира' },
  { link: '/home/about', text: 'О нас', title: 'Описание и история проекта' },
];

const NavList = ({ status }) => {
  const classnames = cx(styles.hideForMenu, styles.headerNavlist, {
    [styles.showOnBurgerAction]: status,
  });

  return (
    <nav className={classnames} id='mainNav'>
      {navList.map(({ link, text, title, href }, index) => {
        return <NavItem link={link} href={href} text={text} title={title} key={index} />;
      })}
    </nav>
  );
};

export default NavList;
