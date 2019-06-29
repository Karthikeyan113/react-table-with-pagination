import React, {Component} from 'react'
import TableHeader from './table-header'
import TableRow from './table-row'
import {TableHeadings, mockData} from '../mock/mock-data'
import Input from '../input/input'
import Select from '../select/select'
import Paginate from '../pagination/paginate'

class Table extends Component{
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.paginate = this.paginate.bind(this)
    this.changeItemsPerpage = this.changeItemsPerpage.bind(this)
    this.items = ['All', 'Male', 'Female']
    this.numerOfItems = [10,15,20, 50]
    this.paginator = 'paginator'
    this.category = 'gender'
    this.state = {
      theaders: [],
      tableData: [],
      filteredItems: [],
      itemPerpage: 10,
      currentPage: 1,
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
    const filteredItems = this.state.tableData.filter((item)=> {
                    let status = true
                    Object.keys(filters).forEach(field => {
                      if(field === 'gender') {
                        status = status && (filters[field] === 'All' || item[field].toLowerCase() === (filters[field].toLowerCase()))
                      }else {
                        status = status && item[field].toLowerCase().includes(filters[field].toLowerCase())
                      }
                    });
                    return status
                  })
    this.setState((state)=> ({
      filteredItems
    }))
    
  }

  paginate(pageNumber) {
    this.setState((state)=> ({
      currentPage: pageNumber
    }))
  }

  changeItemsPerpage(number) {
    this.setState((state) => ({
      itemPerpage: number
    }))
  }

  render() {
    const LastIndex = this.state.currentPage * this.state.itemPerpage
    const firstIndex = LastIndex - this.state.itemPerpage
    const displayItems = this.state.filteredItems.slice(firstIndex, LastIndex)
    return (
      <>
        <Select items={this.numerOfItems} category={this.paginator} onChange={this.changeItemsPerpage} />
        <Input type='text' item='first_name' onChange={this.handleChange} />
        <Input type='text' item='last_name' onChange={this.handleChange} />
        <Select items={this.items} category={this.category} onChange={this.handleChange} />
        {!!this.state.filteredItems.length &&
            <table>
                <TableHeader theaders= {this.state.theaders}/>
                <tbody>
                  {displayItems.map(tableItem => (
                    <TableRow key={tableItem.id} tabledata={tableItem} />
                  ))}
                </tbody>
                <tfooter>
                    <p>displaying {firstIndex+1} - {Math.min(this.state.filteredItems.length, LastIndex)} items of {this.state.filteredItems.length}</p>
                </tfooter>
            </table>}
            {!!this.state.filteredItems.length &&
              <Paginate 
                totalItems={this.state.filteredItems.length} 
                itemsPerPage={this.state.itemPerpage} 
                onClick={this.paginate} 
                activePage = {this.state.currentPage}
                />
            }
      </>
    )
  }
}

export default Table