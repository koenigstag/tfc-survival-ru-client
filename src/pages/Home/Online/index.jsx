import React from 'react';
import TableRow from './TableRow';

const OnlinePage = () => {
  //api call
  const onlineArray = [];

  return (
    <div>
      <h4>Онлайн сервера</h4>
      <table>
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
