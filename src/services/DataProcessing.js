const getLongestBearish = (data) => {
    var currentMax = 0
    var current = 0
    for (let i = 1; i < data.length; i++) {
        if (data[i-1][1] > data[i][1]) {
            current += 1
        } else {
            current = 0
        }

        currentMax = currentMax > current ? currentMax : current
    }
    return currentMax
}

const getLargestVolume = (data) => {
    var currentMax = [0, 0]
    for (let i = 1; i < data.length; i++) {
        currentMax = currentMax[1] > data[i][1] ? currentMax : data[i]
    }
    return currentMax
}

const getLargestPriceDelta = (data) => {
    const deltaPrice = (data, a, b) => {
        return data[b][1] - data[a][1]
    }

    const deltaTime = (data, a, b) => {
        return data[b][0] - data[a][0]
    }

    const recursion = (data, a, b) => {
        if (a >= b) { return [-1, -1] }

        if (deltaTime(data, a, b) < 0) {
            var res1 = recursion(data, a + 1, b)
            var res2 = recursion(data, a, b - 1)

            if (res1[0] === -1) return res2
            if (res2[0] === -1) return res1

            if (deltaPrice(data, res1[0], res1[1]) > deltaPrice(data, res2[0], res2[1])) {
                return res1
            } else {
                return res2
            }
        }

        return [a, b]
    }

    const new_data = data.slice(1, data.length)
    const sorter = (a, b) => {
        return a[1]-b[1]
    }
    new_data.sort(sorter)
    var indices = recursion(new_data, 0, new_data.length - 1)

    var result = (indices[0] === -1) ?
        indices :
        [new_data[indices[0]][0], new_data[indices[1]][0]]

    return result
} 

export { getLongestBearish, getLargestVolume, getLargestPriceDelta }