import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import DateSelector from './components/DateSelector'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { getBitcoinData, getDataByType } from './services/CoinGecko'
import { getLongestBearish, getLargestVolume, getLargestPriceDelta } from './services/DataProcessing'

const App = () => {
    const today = new Date()
    const [startDate, setStartDate] = useState(new Date(today.toLocaleDateString()))
    const [endDate, setEndDate] = useState(new Date(today.toLocaleDateString()))
    const [bitcoinData, setBitcoinData] = useState([])
    const [bearish, setBearish] = useState(0)
    const [totalVolume, setTotalVolume] = useState([0,0])
    const [profit, setProfit] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setBitcoinData(await getBitcoinData(startDate, endDate))
        }
        fetchData()
    }, [startDate, endDate])
    
    useEffect(() => {
        if (bitcoinData) {
            const bearishData = getDataByType(bitcoinData, "prices")
            const volumeData = getDataByType(bitcoinData, "total_volumes")
            const profitData = getDataByType(bitcoinData, "prices")
            setBearish(getLongestBearish(bearishData))
            setTotalVolume(getLargestVolume(volumeData))
            setProfit(getLargestPriceDelta(profitData))
        }
    }, [bitcoinData])

    return (
        <Container className="p-3">
            <Row xs={'auto'} className="justify-content-center" style={{textAlign: 'center'}}>
                <Col>
                    <p>{startDate.toLocaleDateString()}</p>
                    <DateSelector
                        text="Select start date"
                        changeFunction={setStartDate}
                        date={startDate}
                        maxDate={today}
                    />
                </Col>
                <Col>
                    <p>{endDate.toLocaleDateString()}</p>
                    <DateSelector
                        text="Select end date"
                        changeFunction={setEndDate}
                        date={endDate}
                        maxDate={today}
                        minDate={startDate}
                    />
                </Col>
            </Row>
            <Row xs={'auto'} className="justify-content-center">
                <Col>
                    Longest bearish trend: {bearish} d.
                </Col>
            </Row>
            <Row xs={'auto'} className="justify-content-center">
                <Col>
                    Highest trading volume: {totalVolume[1].toLocaleString()} €
                    on {new Date(totalVolume[0]).toLocaleDateString()}<br />
                </Col>
            </Row>
            <Row xs={'auto'} className="justify-content-center">
                { (profit[0] !== -1) 
                    ? <Col>
                            You should buy on {new Date(profit[0]).toLocaleDateString()} and
                            sell on {new Date(profit[1]).toLocaleDateString()}.
                    </Col>
                    : <Col>
                            You should neither buy or sell.
                    </Col>
                }
            </Row>
        </Container>
    )
}

export default App