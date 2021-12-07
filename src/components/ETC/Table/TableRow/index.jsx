import React from 'react';

const TableRow = ({ paths, data }) => {
  return (
    <tr>
      {paths.map((path) => <td key={path}>{data[path]}</td>)}
    </tr>
  );
};

export default TableRow;
