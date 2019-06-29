import React from 'react'

function Select(props) {
  return (
    <select onChange={(e) => props.onChange(e.target.value, props.category)}>
      <option value=""></option>
      {props.items.map((item) => <option key={item} value={item}>{item}</option>)}
    </select>
  )
}

export default Select