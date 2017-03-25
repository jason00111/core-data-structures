'use strict'

export default class DirectedGraph { // really a weighted directed graph
  constructor () {
    this.verticies = []
    this.vectors = [] // {start: 'v1', end: 'v2', weight: 5}
  }

  addVertex (vertex) {
    this.verticies.push(vertex)
  }

  hasVertex (vertex) {
    return this.verticies.includes(vertex)
  }

  addDirection (startVertex, endVertex, weight) {
    this.vectors.push({start: startVertex, end: endVertex, weight: weight})
  }

  _findDirection (startVertex, endVertex) {
    return this.vectors.find(
      vector => vector.start === startVertex && vector.end === endVertex
    )
  }

  _findDirectionIndex (startVertex, endVertex) {
    return this.vectors.findIndex(
      vector => vector.start === startVertex && vector.end === endVertex
    )
  }

  hasDirection (startVertex, endVertex) {
    return this._findDirection(startVertex, endVertex) ? true : false
  }

  getDirectionWeight (startVertex, endVertex) {
    const foundVector = this._findDirection(startVertex, endVertex)

    return foundVector ? foundVector.weight : null
  }

  visit (startVertex, callback) {
    this.verticies.forEach(callback)
  }

  removeDirection (startVertex, endVertex) {
    const foundVectorIndex = this._findDirectionIndex(startVertex, endVertex)

    if (foundVectorIndex !== -1) this.vectors.splice(foundVectorIndex, 1)
  }

  removeVertex (vertexToRemove) {
    const vertexIndex = this.verticies.findIndex(
      vertex => vertex === vertexToRemove
    )

    if (vertexIndex !== -1) this.verticies.splice(vertexIndex, 1)

    let vectorIndex

    while (true) {
      vectorIndex = this.vectors.findIndex(
        vector => vector.start === vertexToRemove || vector.end === vertexToRemove
      )

      if (vectorIndex !== -1) {
        this.vectors.splice(vectorIndex, 1)
      } else break
    }
  }

  getSeparatedVertices () {
    return this.verticies.reduce(
      (separatedVerticies, vertex, index) => {
        const vectorWithVertex = this.vectors.find(
          vector => vector.start === vertex || vector.end === vertex
        )

        if (vectorWithVertex) {
          separatedVerticies.splice(separatedVerticies.indexOf(vertex), 1)
        }

        return separatedVerticies
      },
      this.verticies.slice()
    )
  }

  count () {
    return this.verticies.length
  }

  findShortestPaths (startVertex, endVertex) {
    const shortestPaths = this.findShortestPathsAndWeights(startVertex, endVertex, [], 0).map(path => path.path)

    return shortestPaths.length === 0 ? null : shortestPaths
  }

  findShortestPathsAndWeights (startVertex, endVertex, pathSoFar, weightSoFar) {

    if (startVertex === endVertex) {
      return [{ path: pathSoFar.concat(endVertex), weight: weightSoFar }]
    } else if (pathSoFar.includes(startVertex)) { // loop
      return [{ path: [], weight: Infinity }]
    } else {
      const vectorsStartingAtStart = this.vectors.filter(vector => vector.start === startVertex)

      if (vectorsStartingAtStart.length === 0) // dead end
        return [{ path: [], weight: Infinity }]

      const paths = vectorsStartingAtStart.reduce(
        (pathsAcc, vector) => pathsAcc.concat(this.findShortestPathsAndWeights(vector.end, endVertex, pathSoFar.concat(startVertex), weightSoFar + vector.weight)),
        []
      )

      const minWeight = paths.reduce(
        (minWeight, path) => {
          return path.weight < minWeight ? path.weight : minWeight
        },
        Infinity
      )

      if (minWeight === Infinity) {
        return []
      }

      const shortestPathsFromNextVertex = paths.filter(path => path.weight === minWeight)

      const shortestPathsFromStart = shortestPathsFromNextVertex.map(path => ({
        path: path.path,
        weight: path.weight + this.getDirectionWeight(startVertex, path.path[0])
      }))

      return shortestPathsFromStart
    }
  }
}
