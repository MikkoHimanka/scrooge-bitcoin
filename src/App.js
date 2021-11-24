import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import DateSelector from './components/DateSelector'
import DateLabel from './components/DateLabel'
import TradingVolume from './components/TradingVolume'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { getBitcoinData, getDataByType } from './services/CoinGecko'
import { getLongestBearish, getLargestVolume, getLargestPriceDelta } from './services/DataProcessing'
import Bearish from './components/Bearish'
import Profit from './components/Profit'

const App = () => {
    const today = new Date()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [bitcoinData, setBitcoinData] = useState()
    const [bearish, setBearish] = useState(0)
    const [totalVolume, setTotalVolume] = useState()
    const [profit, setProfit] = useState()

    useEffect(() => {
        const fetchData = async () => {
            if (startDate && endDate) {
                setBitcoinData(await getBitcoinData(startDate, endDate))
            }
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
                <Row xs={'auto'} className="justify-content-center">
                    <Col>
                        <DateLabel date={startDate} />
                        <DateSelector
                            text="Select start date"
                            changeFunction={setStartDate}
                            date={startDate}
                            maxDate={endDate}
                        />
                    </Col>
                    <Col>
                        <DateLabel date={endDate} />
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
                        <Bearish number={bearish} />
                    </Col>
                </Row>
                <Row xs={'auto'} className="justify-content-center">
                    <Col>
                        <TradingVolume volume={totalVolume} />
                    </Col>
                </Row>
                <Row xs={'auto'} className="justify-content-center">
                    <Col>
                        <Profit profit={profit} />
                    </Col>
                </Row>
        </Container>
    )
}

export default App