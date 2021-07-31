import React from 'react';
import ButtonLink from '@/components/ETC/ButtonLink';
import styles from "./HomePage.module.sass";

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <h3>Добро пожаловать на TFC-survival, дружок</h3>
      <div className={styles.homePageButtons}>
        <ButtonLink
          text='Наш дискорд сервер'
          href='https://discord.gg/xaFCzGarws'
          title='Discord сообщество проекта'
        />
        <ButtonLink
          text='Скачать лаунчер'
          link='/home/launcher'
          title='Скачать лаунчер для игры на сервере'
          type='blue'
        />
      </div>
      <h5>Мы есть на мониторингах, голосуйте за нас</h5>
      <div>
        <ButtonLink
          text='minecraftratig.ru'
          href='https://minecraftrating.ru/vote/114193/'
          title='Проголосовать'
        />
        <ButtonLink
          text='monitoringminecraft.ru'
          href='https://monitoringminecraft.ru/top/tfc-survival'
          title='Проголосовать'
        />
      </div>
    </div>
  );
};

export default HomePage;
