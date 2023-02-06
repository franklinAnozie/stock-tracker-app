import React, {useState, useEffect} from 'react'
import finnhub from '../API/finnhub'
import { useGlobalContext } from '../context'

const AutoComplete = () => {
  const {addStock, removeStock} = useGlobalContext()
  const [searchText, setSearchText] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const handleChange = e => {
    setSearchText(e.target.value)
  }
  useEffect(() => {
    const fetchData = async() => {
      try {
        const resp = await finnhub.get(
          `/search`,
          {
            params: 
              {
                q: searchText
              }
          }
        )
        setSearchResult(resp.data.result)
      } catch (error) {
        console.log(error)
      }
    }
    if (searchText.length > 0 && searchText !== '') {
      fetchData()
    } else {
      setSearchResult([])
    }
  }, [searchText])

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