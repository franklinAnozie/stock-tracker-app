import axios from "axios";

const api_key = process.env.REACT_APP_FINNHUB_API_KEY

export default axios.create({
    baseURL: 'https://finnhub.io/api/v1',
    params: {
        'token': api_key
    }
})