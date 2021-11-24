const getDataByType = require('../services/CoinGecko').getDataByType

const data = Object()
data.market_caps = [[1,1],[2,2],[3,3]]
data.total_volumes = [[4,4],[5,5],[6,6]]
data.prices = [[7,7],[8,8],[9,9]]


test('getDataByType returns the correct data when dataType is market_caps', () => {
    const result = getDataByType(data, "market_caps")

    expect(result[0][0]).toBe(1)
})

test('getDataByType returns the correct data when dataType is total_volumes', () => {
    const result = getDataByType(data, "total_volumes")

    expect(result[0][0]).toBe(4)
})

test('getDataByType returns the correct data when dataType is prices', () => {
    const result = getDataByType(data, "prices")

    expect(result[0][0]).toBe(7)
})