import TableRow from './TableRow'
import React from 'react'

export default function Table({ style, className, list, sortFunc, paths, headers, itemKey }) {
  return (
    <table className={className} style={style} >
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
