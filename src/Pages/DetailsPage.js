import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import finnhub from '../API/finnhub'
import { StockChart } from '../Components/StockChart'

const DetailsPage = () => {
  const { symbol } = useParams()
  const [chartData, setChartData] = useState({
    day: '',
    week: '',
    year: ''
  })
  const date = new Date()
  const currentTime = Math.floor(date.getTime()/1000)
  let oneDayAgo
  if (date.getDay() === 6){
    oneDayAgo = currentTime - 2 * 86400
  } else if (date.getDay() === 0){
    oneDayAgo = currentTime - 3 * 86400
  } else {
    oneDayAgo = currentTime - 86400
  }
  const oneWeekAgo = currentTime - 7 * 86400
  const oneYearAgo = currentTime - 365 * 86400
  const timeFrom = [oneDayAgo, oneWeekAgo, oneYearAgo]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Promise.all(timeFrom.map((time)=>{
          return (
            finnhub.get('/stock/candle',{
              params: {
                symbol: symbol,
                resolution: 30,
                from: time,
                to: currentTime
              }
            })
          )
        }))
        const formatData = (data) => {
          return data.t.map((t, i)=> {
            return {
              x: t * 1000,
              y: data.c[i]
            }
          })
        }
        setChartData({
          day: formatData(response[0].data),
          week: formatData(response[1].data),
          year: formatData(response[2].data)
        }) 
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()  
  }, [symbol])
  return (
    <div>
      {chartData && (
        <div>
          <StockChart />
        </div>
      )}
    </div>
  )
}

export default DetailsPage
