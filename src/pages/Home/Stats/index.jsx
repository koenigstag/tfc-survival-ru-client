import React, { useCallback, useEffect, useState } from "react";
import { /* getUserData,  */ getUserStats } from "api/userAPI";
import Table from "components/ETC/Table";
import styles from "./StatsPage.module.sass";
import _ from "lodash";

export const StatsPage = () => {
  const [stats, setStats] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 20;

  const [debounceLoadStats] = useState(() =>
    _.debounce(
      async (page, rowsPerPage) => {
        const { pages, stats } = await getUserStats(page, rowsPerPage);

        setTotalPages(pages);

        const prepared = stats.map((item) => ({
          ...item,
          "stat.playOneMinute": (item["stat.playOneMinute"] / 72000).toFixed(2),
        }));

        setStats(prepared);
      },
      1000,
      { trailing: true }
    )
  );

  // const [data, setData] = useState(null);

  useEffect(() => {
    /* const getData = async () => {
      const data = await getUserData();

      setData(data);
    }; */

    // getData();

    debounceLoadStats(page, rowsPerPage);
  }, [debounceLoadStats, page]);

  const handleNextPage = useCallback(() => {
    setPage((p) => {
      return Math.min(++p, totalPages);
    });
  }, [totalPages]);

  const handlePrevPage = useCallback(() => {
    setPage((p) => {
      return Math.max(--p, 1);
    });
  }, []);

  console.log(stats && stats.length);

  return (
    <>
      <div>
        <button onClick={handlePrevPage}>Пред</button>
        <span
          style={{
            display: "inline-block",
            textAlign: "center",
            minWidth: "50px",
          }}
        >
          {page}/{totalPages}
        </span>
        <button onClick={handleNextPage}>След</button>
      </div>

      <div className={styles.tableWrapper}>
        {stats && (
          <Table
            className={styles.table}
            headers={["Ники", "Смертей", "Выходов", "Прыжков", "Часов"]}
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
