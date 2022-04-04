import React, { useEffect, useState } from "react";
import Table from "components/ETC/Table";
import Stats from "./Stats";
import { getServerInfo } from "api/commonAPI";
import styles from "./StatsPage.module.sass";

const StatsPage = () => {
  const [serverInfo, setServerInfo] = useState({
    online: false,
  });

  useEffect(() => {
    async function getInfo() {
      try {
        const info = await getServerInfo();
        setServerInfo({ online: true, ...info.data });
      } catch (error) {
        setServerInfo({ online: false });
      }
    }
    getInfo();

    const ID = setInterval(() => {
      getInfo();
    }, 3000);
    return () => {
      clearInterval(ID);
    };
  }, []);

  console.log(serverInfo);

  return (
    <div>
      <h4>Онлайн сервера</h4>
      <div>Статус сервера: {serverInfo?.online ? "Включен" : "Отключен"}</div>
      {serverInfo.online && <div>Текущий TPS: {serverInfo.tps?.[1].toFixed(0)}</div>}
      
      <h6 style={{ marginTop: "10px" }}>
        * График обновляется с запаздыванием
      </h6>
      <iframe
        title="minecraftrating/graph/tfc.survival"
        src="https://minecraftrating.ru/server_chart/114193/"
        width="100%"
        height="300"
        frameBorder="0"
      ></iframe>

      <details style={{ border: '1px solid #aaa', padding: '10px 20px' }} >
        <summary style={{ cursor: 'pointer', border: '1px solid #aaa', padding: '10px 20px', margin: '-11px -21px -11px -21px' }} >
          <h4 style={{ display: 'inline-block' }} >
            Сейчас онлайн:{" "}
            {`${serverInfo?.nowOnline ?? 0} / ${serverInfo?.maxPlayers ?? 0}`}
          </h4>
        </summary>

        <div style={{ marginTop: '20px' }}></div>
        <Table
          className={styles.table}
          list={serverInfo.players ? serverInfo.players.map(v => ({ name: v })) : []}
          headers={["Ники"]}
          paths={["name"]}
          sortFunc={(item1, item2) => {
            if (item2.name < item1.name) {
              return 1;
            }
            if (item1.name < item2.name) {
              return -1;
            }
            return 0;
          }}
          itemKey="id"
        />
      </details>
      <details style={{ border: '1px solid #aaa', padding: '10px 20px', marginTop: '10px' }} >
        <summary style={{ cursor: 'pointer', border: '1px solid #aaa', padding: '10px 20px', margin: '-11px -21px -11px -21px' }} ><h4 style={{ display: 'inline-block' }} >Статистика игроков</h4></summary>
        <Stats />
      </details>
    </div>
  );
};

export default StatsPage;
