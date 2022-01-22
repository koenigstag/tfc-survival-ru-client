import React, { useEffect, useState } from 'react';
import Table from 'components/ETC/Table';
import styles from './OnlinePage.module.sass';
import { getServerInfo } from 'api/commonAPI';

const OnlinePage = () => {
  // TODO online full list
  const [serverInfo, setServerInfo] = useState({ online: false, players: { online: 0, max: 50, sample: [] } })

  useEffect(() => {
    async function getInfo() {
      try {
        const info = await getServerInfo();
        // console.log(info);
        setServerInfo(info);
      } catch (error) {
      }
    };
    getInfo();

    const ID = setInterval(() => {
      getInfo();
    }, 3000);
    return () => {
      clearInterval(ID);
    }
  }, [])

  return (
    <div>
      <h4>Онлайн сервера</h4>
      <div>Статус сервера: {serverInfo.online ? 'Включен' : 'Отключен'}</div>

      <h6 style={{ marginTop: '10px' }}>График обновляется с запаздыванием</h6>
      <iframe title='minecraftrating/tfc.survival' src="https://minecraftrating.ru/server_chart/114193/" width="100%" height="300" frameBorder="0"></iframe>

      <h4>Сейчас онлайн: {serverInfo.players && `${serverInfo.players.online} / ${serverInfo.players.max}`} </h4>
      <div>Список (до 12 игроков)</div>
      <div>Для просмотра актуального списка онлайна воспользуйтесь командой list в нашем дискорде в канале</div>
      <Table
        className={styles.table}
        list={serverInfo.players.sample}
        headers={['Ники']}
        paths={['name']}
        sortFunc={(item1, item2) => {
          if (item2.name < item1.name) {
            return 1
          }
          if (item1.name < item2.name) {
            return -1
          }
          return 0
        }}
        itemKey="id"
      />
    </div>
  );
};

export default OnlinePage;
