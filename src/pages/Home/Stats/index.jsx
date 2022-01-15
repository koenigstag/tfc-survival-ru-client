import React, { useEffect, useState } from 'react';
import { getUserData, getUserStats } from 'api/userAPI';
import Table from 'components/ETC/Table';

export const StatsPage = () => {
  const [stats, setStats] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      const stats = await getUserStats();

      setStats(stats);
    };

    getStats();

    const getData = async () => {
      const data = await getUserData();

      setData(data);
    };

    getData();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      {stats && (
        <Table
          headers={['Ники', 'Смертей', 'Выходов', 'Прыжков']}
          list={stats}
          paths={['', 'stat.deaths', 'stat.leaveGame', 'stat.jump']}
          itemKey={'uuid'}
        />
      )}
      {/* <pre>Stats {JSON.stringify(stats, null, 4)}</pre>
      <pre>Dat {JSON.stringify(data, null, 4)}</pre> */}
    </div>
  );
};

export default StatsPage;
