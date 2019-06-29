import React from 'react'
import Cell from './table-cell'

function TableRow(props) {
  const timestamp = new Date(parseInt(props.tabledata.timestamp))
  return (
    <tr>
        <Cell item = {props.tabledata.id} />
        <Cell item = {props.tabledata.first_name} />
        <Cell item = {props.tabledata.last_name} />
        <Cell item = {props.tabledata.email} />
        <Cell item = {props.tabledata.gender} />
        <Cell item = {timestamp.toDateString()} />
    </tr>
  )
}

export default TableRow