import React from 'react';

const TableRow = ({ nickname, date, banner, omnision, reason }) => {
  return (
    <tr>
      <td>{nickname}</td>
      <td>{date}</td>
      <td>{banner}</td>
      <td>{omnision}</td>
      <td>{reason}</td>
    </tr>
  );
};

export default TableRow;
