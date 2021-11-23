var startUTC

const getCloser = (first, second, target) => {
    return Math.abs(first[0]-target) < Math.abs(second[0] - target) ?
        first :
        second
}

const getDataByType = (data, dataType) => {
    switch (dataType) {
        case "market_caps": {
            return parseData(data.market_caps)
        }
        case "total_volumes": {
            return parseData(data.total_volumes)
        }
        default: {
            return parseData(data.prices)
        }
    }
}

const parseData = (json_data) => {
    if (!json_data) { return [] }
    const data = [json_data[0]]

    const deltaTime = 86400000
    var currentTime = startUTC + deltaTime

    for (let i = 1; i < json_data.length; i++) {
        if (json_data[i][0] >= currentTime) {
            data.push(getCloser(json_data[i-1], json_data[i], currentTime))
            currentTime += deltaTime
        }
    }

    return data
}

const getBitcoinData = async (start, end) => {
    startUTC = Date.UTC(
        start.getFullYear(),
        start.getMonth(),
        start.getDate() - 1,
    )
    const endUTC = Date.UTC(
        end.getFullYear(),
        end.getMonth(),
        end.getDate(),
        end.getHours() + 1,
    )

    const url = "https://api.coingecko.com/api/v3/coins/bitcoin/" +
        "market_chart/range?vs_currency=eur&" +
        `from=${startUTC.toString().slice(0,10)}` +
        `&to=${endUTC.toString().slice(0,10)}`

    const res = await fetch(url)
    const json = await res.json()
    
    return json
}
export { getBitcoinData, getDataByType }