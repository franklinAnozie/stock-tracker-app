import React from 'react'
import { useGlobalContext as contextOne } from '../context/autoCompleteContext'
import { useGlobalContext as contextTwo } from '../context/context'

const AutoComplete = () => {
  const { searchResult, searchText, setSearchText } = contextOne()
  const { addStock } = contextTwo()
    const handleChange = e => {
    setSearchText(e.target.value)
  }
  const showDropDown = () => {
    return searchResult.length > 1 ? 'show' : ''
  }
  return (
    <div className='w-50 p-5 rounded mx-auto'>
      <div className='form-floating dropdown'>
        <input
          style={
            {
              backgroundColor: 'rgb(145, 158, 171, 0.04)'
            }
          } 
          type='text'
          className='form-control'
          id='search'
          placeholder='Search'
          autoComplete='off'
          onChange={handleChange}
          value={searchText}
          />
          <label htmlFor='search'>Search</label>
          <ul
            className={`dropdown-menu ${showDropDown()}`}
            style={
              {
                height: '500px',
                overflowY: 'scroll',
                overflowX: 'hidden',
                cursor: 'pointer'
              }
            }>
            {searchResult.map(item => (
              <li key={item.symbol}
                className='dropdown-item'
                onClick={()=> {
                  addStock(item.symbol)
                  setSearchText('')}
                }>
                {item.description}
                ({item.symbol})
              </li>
            ))}
          </ul>
      </div>
    </div>
  )
}

export default AutoComplete