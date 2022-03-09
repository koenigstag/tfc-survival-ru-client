import TableRow from "./TableRow";
import React from "react";

export default function Table({
  style,
  className,
  list,
  sortFunc,
  paths,
  defaultValue,
  headers,
  itemKey,
}) {
  return (
    <table className={className} style={style}>
      <thead>
        <tr>
          {headers.map((header) => (
            <td key={header}>{header}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {list.sort(sortFunc).map((data) => (
          <TableRow
            defaultValue={defaultValue}
            data={data}
            paths={paths}
            key={data[itemKey] + '_' + Math.random() * 100}
          />
        ))}
      </tbody>
    </table>
  );
}
