import {useState} from 'react'
import Chart from 'react-apexcharts'

export const StockChart = ({ chartData, symbol }) => {

    const {day, week, year} = chartData
    const [dateFormat, setDateFormat] = useState('2hrs')

    const dateSelector = () => {
        switch (dateFormat){
            case '24hrs':
                return day
            case '1WK':
                return week
            case '1Y':
                return year
            default:
                return day
        }
    }
    // const paintSelected = dateSelector()[dateSelector().length-1].y - dateSelector()[0].y > 0 ? 'green' : 'red'

    const options = {
        // colors: [paintSelected()],
        title: {
            text: symbol,
            align: 'center',
            style: {
                fontSize: '20px'
            }
        },
        charts: {
            id: 'stock data',
            annimation: {
                speed: 1300
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false
            }
        },
        tooltip: {
            x: {
                format: 'dd MMM HH:MM:ss',
            }
        }
    }

    const series = [{
        name: symbol,
        data: dateSelector()
    }]

    const selectedButton = (button) => {
        const classes = 'btn m-1 '
        return (button === dateFormat) ? classes + 'btn-primary' : classes + 'btn-outline-primary'
    }

    return <div className='mt-5 p-4 shadow-sm bg-white'>
        <Chart
            options={options}
            series={series}
            type='area'
            width='100%'
        />
        <div>
            <button className={selectedButton('24hrs')} onClick={()=> setDateFormat('24hrs')}>24hrs</button>
            <button className={selectedButton('1WK')} onClick={()=> setDateFormat('1WK')}>1WK</button>
            <button className={selectedButton('1Y')} onClick={()=> setDateFormat('1Y')}>1Y</button>
        </div>
    </div>
}