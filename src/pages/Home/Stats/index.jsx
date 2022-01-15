import React, { useEffect, useState } from "react";
import { /* getUserData,  */ getUserStats } from "api/userAPI";
import Table from "components/ETC/Table";
import styles from "./StatsPage.module.sass";

export const StatsPage = () => {
  const [stats, setStats] = useState(null);
  // const [data, setData] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      const stats = await getUserStats();

      const prepared = stats.map((item) => ({
        ...item,
        "stat.playOneMinute": (item["stat.playOneMinute"] / 72000).toFixed(2),
      }));

      setStats(prepared);
    };

    getStats();

    /* const getData = async () => {
      const data = await getUserData();

      setData(data);
    }; */

    // getData();
  }, []);

  return (
    <>
      <h4>Статистика игроков</h4>

      <div className={styles.tableWrapper}>
        {stats && (
          <Table
            className={styles.table}
            headers={[
              "Ники",
              "Смертей",
              "Выходов",
              "Прыжков",
              "Часов",
            ]}
            list={stats}
            paths={[
              "nickname",
              "stat.deaths",
              "stat.leaveGame",
              "stat.jump",
              "stat.playOneMinute",
            ]}
            itemKey={"nickname"}
          />
        )}
        {/* <pre>Stats {JSON.stringify(stats, null, 4)}</pre>
      <pre>Dat {JSON.stringify(data, null, 4)}</pre> */}
      </div>
    </>
  );
};

export default StatsPage;
