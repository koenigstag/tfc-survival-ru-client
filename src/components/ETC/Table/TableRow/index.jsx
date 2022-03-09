import React from 'react';

const TableRow = ({ paths, data, defaultValue }) => {
  return (
    <tr>
      {paths.map((path) => <td key={path}>{Boolean(data[path]) ? data[path] : defaultValue}</td>)}
    </tr>
  );
};

export default TableRow;
