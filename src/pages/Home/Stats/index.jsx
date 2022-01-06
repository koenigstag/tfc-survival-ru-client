import React, { useEffect, useState } from 'react'
import { getUserData, getUserStats } from 'api/userAPI';

export const StatsPage = () => {
  const [stats, setStats] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      const data = await getUserStats();

      setStats(data);
    };

    getStats();

    const getData = async () => {
      const data = await getUserData();

      setData(data);
    };

    getData();
  }, [])

  return (
    <div style={{display: 'flex'}}>
      <pre>
        Stats{' '}
        {JSON.stringify(stats, null, 4)}
      </pre>
      <pre>
        Dat{' '}
        {JSON.stringify(data, null, 4)}
      </pre>
    </div>
  )
}

export default StatsPage;
