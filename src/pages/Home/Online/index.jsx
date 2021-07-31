import React from 'react';
import TableRow from './TableRow';
import styles from './OnlinePage.module.sass';

const OnlinePage = () => {
  //api call
  const onlineArray = [];

  return (
    <div>
      <h4>Онлайн сервера</h4>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ники</th>
          </tr>
        </thead>
        <tbody>
          {onlineArray.map(data => (
            <TableRow data={data} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OnlinePage;
