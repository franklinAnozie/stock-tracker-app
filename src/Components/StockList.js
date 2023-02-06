import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs'

const StockList = () => {

  const { stock } = useGlobalContext()
  const navigate = useNavigate()

  const stockMovementColor = (change) => {
    return change < 0 ? "danger" : "success"
  }
  
  const stockMovementDirection = (change) => {
    return change < 0 ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />
  }

  const handleStockSelect = (symbol) => {
    navigate(`details/${symbol}`)
  }

  return (
    <div>
      <table className='table hover mt-5'>
        <thead style={{color: 'rgb(79, 89, 102)'}}>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Last</th>
            <th scope='col'>Chng</th>
            <th scope='col'>Chng%</th>
            <th scope='col'>High</th>
            <th scope='col'>Low</th>
            <th scope='col'>Open</th>
            <th scope='col'>PClose</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((eachStock)=> {
            const {symbol, data } = eachStock
            const {c,d,dp,h,l,o,pc} = data
            return (
              <tr
                key={symbol}
                className='table-row'
                onClick={()=>handleStockSelect(symbol)}
                style={{cursor: 'pointer'}}
              >
                  <th scope='row'>{symbol}</th>
                  <td>{c}</td>
                  <td className={`text-${stockMovementColor(d)}`}>{d}{stockMovementDirection(d)}</td>
                  <td className={`text-${stockMovementColor(dp)}`}>{dp}{stockMovementDirection(d)}</td>
                  <td>{h}</td>
                  <td>{l}</td>
                  <td>{o}</td>
                  <td>{pc}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default StockList