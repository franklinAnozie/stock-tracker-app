import { useState, useEffect, useContext, createContext } from 'react'
import { useParams } from 'react-router-dom'
import finnhub from '../API/finnhub'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const { symbol } = useParams()
    const [chartData, setChartData] = useState({})

    const formatData = (data) => {
        const {c, t} = data
        return t.map((t, i)=> {
            return {
            x: t * 1000,
            y: Math.floor(c[i])
            }
        })
    }

    useEffect(() => {
        let date = new Date()
        let currentTime = Math.floor(date.getTime()/1000)
        let oneDayAgo
        if (date.getDay() === 6){
            oneDayAgo = currentTime - 2 * 86400
        } else if (date.getDay() === 0){
            oneDayAgo = currentTime - 3 * 86400
        } else {
            oneDayAgo = currentTime - 86400
        }
        let oneWeekAgo = currentTime - 7 * 86400
        let oneYearAgo = currentTime - 365 * 86400
        let timeFrom = [oneDayAgo, oneWeekAgo, oneYearAgo]

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
        <AppContext.Provider value={{ chartData, symbol }}>
            { children }
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}