import TableRow from './TableRow'
import React from 'react'

export default function Table({ className, list, sortFunc, paths, headers, itemKey }) {
  return (
    <table className={className}>
      <thead>
        <tr>
          {headers.map((header) => <td key={header}>{header}</td>)}
        </tr>
      </thead>
      <tbody>
        {list.sort(sortFunc).map(data => <TableRow data={data} paths={paths} key={data[itemKey]} />)}
      </tbody>
    </table>
  )
}
