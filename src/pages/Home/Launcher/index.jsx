import React, { useCallback } from "react";
import ButtonLink from "components/ETC/ButtonLink";
import styles from "./LauncherPage.module.sass";
import { baseURL } from "api";

const LauncherPage = () => {

  const getBitString = useCallback(() => {
    if (window.navigator.userAgent.includes('x64') || window.navigator.userAgent.includes('64')) {
      return 'x64';
    } else if (window.navigator.userAgent.includes('x86') || window.navigator.userAgent.includes('x32')) {
      return 'x86';
    }
    return 'x64';
  }, []);

  const getOSString = useCallback((invert = false) => {
    let result;
    if (window.navigator.userAgent.includes('Macintosh')) {
      return invert ? 'Windows' : 'MacOS';
    }
    if (window.navigator.userAgent.includes('Linux')) {
      result = invert ? 'Windows' : 'Linux';
    } else {
      result = invert ? 'Linux' : 'Windows';
    }

    return result;
  }, []);

  const getLauncherFileSrc = useCallback((invert = false) => {
    let result;
    if (getOSString() === 'Linux' || getOSString() === 'MacOS') {
      result = invert ? 'Launcher.exe' : 'Launcher.jar';
    } else {
      result = invert ? 'Launcher.jar' : 'Launcher.exe';
    }

    return result;
  }, [getOSString]);

  const getJREFileSrc = useCallback(() => {
    let result;
    if (getOSString() === 'Linux') {
      if (getBitString() === 'x64') {
        result = 'jre-8u321-linux-x64.tar.gz';
      } else {
        result = 'jre-8u321-linux-i586.tar.gz';
      }
    } else if (getOSString() === 'Macintosh') {
      if (getBitString() === 'x64') {
        result = 'jre-8u321-macosx-x64.dmg';
      }
    } else if (getOSString() === 'Windows') {
      if (getBitString() === 'x64') {
        result = 'jre-8u321-windows-x64.exe';
      } else {
        result = 'jre-8u321-windows-i586.exe';
      }
    }

    return result;
  }, [getOSString, getBitString]);

  return (
    <>
      <div className={styles.launcherDiv}>
        <h1>Лаунчер</h1>
        <br />
        <p>Скачать лаунчер:</p>
          <div>
            <ButtonLink
              target=''
              variant="blue"
              text={`Скачать лаунчер для ${getOSString()}`}
              title="Исполняемый файл. Необходимо JRE 1.8+."
              href={`${baseURL}/static/launchers/${getLauncherFileSrc()}`}
            />
          </div>
          <a style={{ display: 'inline-block', marginTop: '10px' }} href={`${baseURL}/static/launchers/${getLauncherFileSrc(true)}`}>Или для {getOSString(true)}</a>
      </div>
      <div className={styles.addInfoDiv}>
        <br />
        <p>
          Для комфортной игры следует выделить более 2 ГБ оперативной памяти.
        </p>
        <p>
          Рекомендуем скачать{" "}
          <a
            href="https://www.java.com/en/download/manual.jsp"
            target="_blank"
            rel="noreferrer"
          >
            Java Offline {getBitString()}
          </a>
          , для коректной работы игры.
        </p>
        <p>
          Если ссылка на оф. сайт Oracle недоступна то можно скачать JRE v1.8321 для {getOSString()} {getBitString()} по 
          <a href={`${baseURL}/static/jre/${getJREFileSrc()}`}> этой ссылке</a>. Для других систем<a href={`${baseURL}/static/launchers/`}> тут</a>.
        </p>
        <hr />
        <br />

        <p>Так же, для устранения вопросов, касающихся лаунчера и сайта:</p>
        <p>
          Лаунчер имеет открытый исходный код, который можно найти в{" "}
          <a
            href="https://github.com/new-sashok724/Launcher"
            target="_blank"
            rel="noreferrer"
          >
            GitHub репозитории
          </a>{" "}
          создателя лаунчера.
        </p>
        <div>
          Cкачивая и заходя на сервер вы автоматически передаете в базу данных
          проекта:
          <ul>
            <li>Login указанный при регистрации</li>
            <li>E-mail указанный при регистрации</li>
            <li>
              Пароль указанный при регистрации, который хранится в захешированом
              виде
            </li>
            <li>IP-адрес при регистрации на сайте</li>
            <li>
              Данные о вашей конфигурации пк (железо компьютера), при заходе в
              игру
            </li>
            <li>MАС-адрес, при заходе в игру</li>
          </ul>
        </div>
        <br />
        <div>
          Эти данные собирают все без исключения проекты Minecraft, имеющие свой
          лаунчер!
          <br />
          Выше перечисленные данные нужны для:
          <ul>
            <li>Защиты вашего игрового аккаунта от других игроков (Пароль)</li>
            <li>
              Подтверждения эл. почты для связи администрации с вами, в случае
              неполадок с аккаунтом или утраты доступа к нему (E-mail)
            </li>
            <li>
              Подтверждения факта взлома игрового аккаунта, восcтановления
              доступа к аккаунту (IP)
            </li>
            <li>
              Предотвращения доступа к игровому серверу путем сравнения данных,
              при нарушении правил (E-mail, IP, MAC, данные о железе)
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LauncherPage;
