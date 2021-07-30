import React from 'react';
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
  { link: '/home/about', text: 'О нас', title: 'Описание и история проекта' },
];

const NavList = () => {
  return (
    <div>
      <nav className={styles.headerNavlist}>
        {navList.map(({ link, text, title }) => {
          return <NavItem link={link} text={text} title={title} />;
        })}
      </nav>
    </div>
  );
};

export default NavList;
