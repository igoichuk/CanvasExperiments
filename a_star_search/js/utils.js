function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function initMatrix(rows, columns, value) {
    var matrix = new Array(rows)
    for (var i = 0; i < rows; i++) {
        matrix[i] = new Array(columns)
        if (value != undefined) 
            for (var j = 0; j < columns; j++)
                matrix[i][j] = value
    }
    return matrix
}

function distance(a, b) {
    var sideX = Math.abs(a.x - b.x)
    var sideY = Math.abs(a.y - b.y)
    return Math.sqrt(sideX * sideX + sideY * sideY)
}

function equals(a, b) {
    return a.x === b.x && a.y === b.y
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}