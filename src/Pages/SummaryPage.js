import React from 'react'
import AutoComplete from '../Components/autoComplete'
import StockList from '../Components/StockList'
import { AppProvider } from '../context/autoCompleteContext'
import { AppProvider as MainProvider } from '../context/context';

const SummaryPage = () => {
  
  return (
    <div>
      <MainProvider>
        <AppProvider>
          <AutoComplete />
        </AppProvider>
        <StockList />
      </MainProvider>
    </div>
  )
}

export default SummaryPage