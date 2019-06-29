import React from 'react'

function TableHeader(props) {
  const headers = props.theaders.map((theader) => (
    <th key={theader}>{theader}</th>
  ))
  return (
    <thead>
      <tr>{headers}</tr>
    </thead>
  )
}

export default TableHeader