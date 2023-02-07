import { useEffect, useState, useContext, createContext } from "react"
import finnhub from "../API/finnhub"

export const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [searchText, setSearchText] = useState('')
    const [searchResult, setSearchResult] = useState([])
    
    useEffect(() => {
        const fetchData = async() => {
            try {
                const resp = await finnhub.get(`/search`,
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

    return (
        <AppContext.Provider value={{searchResult, searchText, setSearchText}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}