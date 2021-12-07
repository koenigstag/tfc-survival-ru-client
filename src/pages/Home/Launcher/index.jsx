import React from 'react';
import ButtonLink from 'components/ETC/ButtonLink';
import styles from './LauncherPage.module.sass';
import { baseURL } from 'api';

const LauncherPage = () => {
  return (
    <div className={styles.launcherDiv}>
      <h1>Лаунчер</h1>
      <br />
      <p>Скачать лаунчер:</p>
      <ul>
        <li>
          <div>
            <span>Для Windows:</span>
            <ButtonLink
              variant='blue'
              text='Launcher.exe'
              title='Исполняемый файл .exe для ОС Windows. Необходимо JRE 1.8+.'
              href={`${baseURL}/static/launchers/Launcher.exe`}
            />
          </div>
        </li>
        <li>
          <br />
          <div>
            <span>Для MacOS/Linux:</span>
            <ButtonLink
              variant='blue'
              text='Launcher.jar'
              title='Исполняемый файл .jar для ОС Linux. Необходимо JRE 1.8+.'
              href={`${baseURL}/static/launchers/Launcher.jar`}
            />
          </div>
        </li>
      </ul>
      <br />
      <p>Для комфортной игры следует выделить более 2 ГБ оперативной памяти.</p>
      <p>
        Рекомендуем скачать java Offline 64-bit, для коректной работы игры:{' '}
        <a href='https://www.java.com/en/download/manual.jsp'>
          Ссылка на скачивание
        </a>
        .
      </p>
    </div>
  );
};

export default LauncherPage;
