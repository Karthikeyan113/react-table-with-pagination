import React, {Component} from 'react'
import TableHeader from './table-header'
import TableRow from './table-row'
import {TableHeadings, mockData} from '../mock/mock-data'
import Cell from './table-cell'

class Table extends Component{
  constructor(props) {
    super(props)
    this.state = {
      theaders: [],
      tableData: [],
      itemPerpage: 10,
      page: 1,
      totalItems: 1
    }
  }

  componentDidMount() {
    this.setState((state, props) => ({
      theaders: TableHeadings,
      tableData: mockData,
      totalItems: mockData.length,
    }))
  }

  getPages() {
    const pages = [];
    console.log(this.state.totalItems/this.state.itemPerpage, this.totalpages)
    for(let i=1; i<= this.state.totalItems/this.state.itemPerpage; i++) {
      pages.push((<Cell key={i} item={i} />))
    }
    return pages
  }
  render() {
    return (
      <table>
          <TableHeader theaders= {this.state.theaders}/>
          <tbody>
            {this.state.tableData.map(tableItem => (
              <TableRow key={tableItem.id} tabledata={tableItem} />
            ))}
          </tbody>
      </table>
    )
  }
}

export default Table