import React from 'react';
import TableRow from './TableRow';
import styles from './BannedPage.module.sass';

const BannedPage = () => {
  // api call
  const bannedArray = [];

  return (
    <div>
      <h4>Забаненные игроки</h4>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ники</th>
            <th>Дата</th>
            <th>Кем забанен</th>
            <th>Когда истекает</th>
            <th>Причина</th>
          </tr>
        </thead>
        <tbody>
          {bannedArray.map(data => (
            <TableRow data={data} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BannedPage;
