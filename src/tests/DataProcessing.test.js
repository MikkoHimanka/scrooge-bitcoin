const getLongestBearish = require('../services/DataProcessing').getLongestBearish
const getLargestVolume = require('../services/DataProcessing').getLargestVolume
const getLargestPriceDelta = require('../services/DataProcessing').getLargestPriceDelta

const data1 = [[1,9],[2,8],[3,15]]


test('getLongestBearish returns 1 from data1', () => {
    const result = getLongestBearish(data1)
    expect(result).toBe(1)
})

test('getLargestVolume returns array with largest value from data1', () => {
    const result = getLargestVolume(data1)

    expect(result).toEqual([3, 15])
})

test('getLargestPriceDelta returns pair of arrays that have the largest difference from data1', () => {
    const result = getLargestPriceDelta(data1)

    expect(result).toEqual([2, 3])
})