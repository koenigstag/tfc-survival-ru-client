import React from 'react';
import Table from 'components/ETC/Table';
import bannedList from 'banned-players.json'
import styles from './BannedPage.module.sass';

const BannedPage = () => {
  return (
    <>
      <h4>Забаненные игроки</h4>
      <div className={styles.tableWrapper}>
        <Table
          className={styles.table}
          list={bannedList}
          sortFunc={(item1, item2) => {
            if (item2.created > item1.created) {
              return 1
            }
            if (item1.created > item2.created) {
              return -1
            }
            return 0
          }}
          headers={['Ник', 'Дата', "Кем забанен", "Когда истекает", "Причина"]}
          paths={['name', 'created', 'source', 'expires', 'reason']}
          itemKey="uuid"
        />
      </div>
    </>
  );
};

export default BannedPage;
