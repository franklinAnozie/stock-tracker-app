import {useState, useEffect, useContext, createContext} from 'react'
import finnhub from '../API/finnhub'

export const AppContext = createContext()

export const AppProvider = ({children}) => {

    const [stock, setStock] = useState([])
    const [watchList, setWatchList] = useState(['GOOGL', 'TSLA', 'MSFT', 'AMZN', 'AAPL'])

    const addStock = (stock) => {
        return (watchList.indexOf(stock) === -1
            ? setWatchList([...watchList, stock])
            : watchList)
    }

    const removeStock = (stock) => {
        return setWatchList(watchList.filter(item => item !== stock))
    }

    useEffect(() => {
        const fetchData = async() => {
            try {
                const resp = await Promise.all(watchList.map((stock)=>{
                return (
                    finnhub.get(`/quote`, {
                    params: {
                        symbol: stock
                    }
                    })
                )
                })) 
                const data = resp.map((stock) => {
                return (
                    {
                    data: stock.data,
                    symbol: stock.config.params.symbol
                    }
                )
                })
                setStock(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [watchList])

    return (
        <AppContext.Provider value={
            {
                stock,
                setStock,
                watchList,
                setWatchList,
                addStock,
                removeStock
            }
        }>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}
