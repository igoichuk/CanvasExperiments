class Renderer {
    constructor(options) {
        this.options = options
    }

    drawCell(position, color) {
        var options = this.options
        var ctx = options.ctx
        var x = options.left + position.x * options.cellWidth
        var y = options.top + position.y * options.cellHeight

        ctx.fillStyle = color
        ctx.fillRect(x, y, options.cellWidth, options.cellHeight)
        ctx.strokeStyle = options.gridColor
        ctx.strokeRect(x, y, options.cellWidth, options.cellHeight)
    }

    drawBoard(board, getColor) {
        var rows = board.length
        var columns = board[0].length

        for (var y = 0; y < rows; y++) {
            for (var x = 0; x < columns; x++) {
                this.drawCell({ x:x, y:y }, getColor(board[y][x]))
            }
        }
    }
}