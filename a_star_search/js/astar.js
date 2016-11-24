function AStar(start, goal, searchOptions, boardOptions) {
    var rows = boardOptions.rows
    var columns = boardOptions.columns
    var heuristic = searchOptions.heuristic

    var visited = initMatrix(rows, columns, 0)
    var dist = initMatrix(rows, columns, Number.MAX_VALUE)
    var path = initMatrix(rows, columns)

    // pairs node -> value, value is shortest path from source + expected distance (heuristic) to goal
    var fringe = [[start, heuristic(start)]]
    dist[start.y][start.x] = 0

    while (fringe.length > 0) {
        // get the best (smallest value) point from the fringe
        // ideally priority queue (binary heap)...but sorting would do for demnstration purpose
        // sort decreasing becasue pop() from the end of array is faster 
        fringe.sort((a,b) => b[1] - a[1]) 
        var best = fringe.pop()[0]
        
        // goal!
        if (equals(best, goal)) break
        
        // otwerwise mark visited
        visited[best.y][best.x] = 1

        // notify for visualization
        if (searchOptions.onVisited != undefined)
            searchOptions.onVisited(best)

        // get not visited neighbours of the best node
        var neighbors = searchOptions.getNeighbours(best).filter(p => !visited[p.y][p.x])
        for(var n of neighbors) {
            var g = dist[best.y][best.x] + 1
            var fringeIndex = fringe.findIndex(a => equals(a, n))

            // if not in fringe or this way distance is smaller update
            if (fringeIndex < 0 || g < dist[n.y][n.x])
            {
                var f = g + heuristic(n)
                if (fringeIndex < 0)
                    fringe.push([n,f])
                else 
                    fringe[fringeIndex] = [n,f]

                dist[n.y][n.x] = g
                path[n.y][n.x] = best

                // notify about fringe
                if (searchOptions.onFringe != undefined)
                    searchOptions.onFringe(n)
            }
        }
    }

    // reconstruct path
    var result = []
    var p = path[goal.y][goal.x]
    while (p != undefined && !equals(p, start))
    {
        result.push(p)
        p = path[p.y][p.x]
    }
    result.push(start)

    //return path
    return result.reverse()
}