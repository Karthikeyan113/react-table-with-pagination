import React, {Component} from 'react'
import TableHeader from './table-header'
import TableRow from './table-row'
import {TableHeadings, mockData} from '../mock/mock-data'
import Input from '../input/input'
import Select from '../select/select'
class Table extends Component{
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.items = ['Male', 'Female']
    this.category = 'gender'
    this.state = {
      theaders: [],
      tableData: [],
      filteredItems: [],
      itemPerpage: 10,
      page: 1,
      totalItems: 1,
      filters: {}
    }
  }

  componentDidMount() {
    this.setState((state, props) => ({
      theaders: TableHeadings,
      tableData: mockData,
      totalItems: mockData.length,
      filteredItems: mockData
    }))
  }

  handleChange(value, filteredField) {
    const filters = this.state.filters
    filters[filteredField] = value
    this.setState((state) => ({
      filters
    }))
    this.setState((state)=> ({
      filteredItems: this.state.tableData
          .filter((item)=> {
            let status = true
            Object.keys(filters).forEach(field => {
              if(field === 'gender') {
                status = status && (!filters[field] || item[field].toLowerCase() === (filters[field].toLowerCase()))
              }else {
                status = status && item[field].toLowerCase().includes(filters[field].toLowerCase())
              }
            });
            return status
          })
    }))
    
  }

  render() {
    return (
      <>
        <Input type='text' item='first_name' onChange={this.handleChange} />
        <Input type='text' item='last_name' onChange={this.handleChange} />
        <Select items={this.items} category={this.category} onChange={this.handleChange} />
        <select onChange={this.handleChange}>
          <option value=""></option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <table>
            <TableHeader theaders= {this.state.theaders}/>
            <tbody>
              {this.state.filteredItems.map(tableItem => (
                <TableRow key={tableItem.id} tabledata={tableItem} />
              ))}
            </tbody>
        </table>
      </>
    )
  }
}

export default Table