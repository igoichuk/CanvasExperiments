class Board {
    // enum
    static get Cell() { return  Object.freeze({ EMPTY: 0, WALL: 1 }) }

    constructor(boardOptions) {
        this.boardOptions = Object.freeze(boardOptions)
        this.board = this.generateBoard()
    }

    generateBoard() {
        var rows = this.boardOptions.rows
        var columns = this.boardOptions.columns

        var board = initMatrix(rows, columns)

        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
                //board[i][j] = Board.Cell.EMPTY

                // 50% chance of a wall
                board[i][j] = (Math.random() > 0.6) ? Board.Cell.WALL: Board.Cell.EMPTY
            }
        }
        return board
    }

    // generates in a given range xfrom..xto, yfrom..yto expresses as percents [0..1]
    generatePoint(range) {
        var rows = this.boardOptions.rows
        var columns = this.boardOptions.columns

        // convert 0..1 to cell index
        var xfrom = (range.xfrom || 0) * columns
        var xto = (range.xto || 1) * (columns - 1)
        var yfrom = (range.yfrom || 0) * rows 
        var yto = (range.yto || 1) * (rows - 1) 

        var x, y
        do {
            x = randomInt(xfrom, xto)
            y = randomInt(yfrom, yto) 
        } while (this.board[y][x] != Board.Cell.EMPTY)

        return { x:x, y:y }
    }

    getNeighbours(a) {
        var rows = this.boardOptions.rows
        var columns = this.boardOptions.columns

        var result = []

        for (var dy = -1; dy < 2; dy++) {
            for (var dx = -1; dx < 2; dx++) {

                if (dy === 0 && dx === 0) continue
                var x = a.x + dx
                var y = a.y + dy
                if (x < 0 || x >= columns || y < 0 || y >= rows) continue

                if (this.board[y][x] === Board.Cell.WALL) continue

                result.push({ x:x, y:y });
            }
        }
        return result
    } 
}