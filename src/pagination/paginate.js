import React from 'react'
import './paginate.css'

function Paginate(props) {
  const pageNumbers = []

  for(let i = 1; i <= Math.ceil(props.totalItems/props.itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a href="!#"  
              className={props.activePage === number? 'active': 'inactive'} 
              onClick={() => props.onClick(number)}>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Paginate
