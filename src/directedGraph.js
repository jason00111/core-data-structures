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
}
