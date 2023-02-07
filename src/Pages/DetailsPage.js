import React from 'react'
import { StockChart } from '../Components/StockChart'
import { useGlobalContext, AppProvider } from '../context/detailsContext'

const DetailsPage = () => {
  const { chartData, symbol } = useGlobalContext()
 
  return (
    <div>
      <AppProvider>
        {chartData && (
        <div>
          <StockChart chartData={chartData} symbol={symbol}/>
        </div>
        )}
      </AppProvider>
    </div>
  )
}

export default DetailsPage
