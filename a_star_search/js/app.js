//import {Renderer} from "renderer"

class App {
    constructor(ctx) {
        this.ctx = ctx
    }

    async run() {
        // initialize renderer
        var renderer = new Renderer({
            ctx: this.ctx,
            left: 10,
            top: 10,
            cellWidth: 6,
            cellHeight: 6,
            gridColor: 'LightGray'
        })

        // initialize game board
        var boardOptions = { rows: 100, columns: 100 }
        var board = new Board(boardOptions)

        // define cell colors 
        var cellColors = {}
        cellColors[Board.Cell.EMPTY] = "White"
        cellColors[Board.Cell.WALL] = "Gray"

        renderer.drawBoard(board.board, cell => cellColors[cell])

        // generate start and goal points 
        var start = board.generatePoint({ xto: 0.2, yfrom: 0.8 })
        var goal = board.generatePoint({ xfrom: 0.8, yto: 0.2 })

        renderer.drawPoint(start, "Green")
        renderer.drawPoint(goal, "Red")

        // search path
        var path = await AStar(start, goal, {
                getNeighbours: p => board.getNeighbours(p, board),
                heuristic: p => distance(p, goal),
                onVisited: p => renderer.drawCell(p, "SkyBlue"),
                onFringe: p => renderer.drawCell(p, "LightCyan"),
                onTurn: () => {
                    renderer.drawPoint(start, "Green")
                    renderer.drawPoint(goal, "Red")
                }
            },
            boardOptions)

        // draw path
        for(var p of path) {
            renderer.drawCell(p, "Blue")
        }

        // draw start and goal
        renderer.drawPoint(start, "Green")
        renderer.drawPoint(goal, "Red")
    }
}