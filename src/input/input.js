import React from 'react'

function Input(props) {
  return (
    <input type={props.type}
          placeholder={props.item}
          onChange={(e)=> props.onChange(e.target.value, props.item)
        }/>
  )
}

export default Input