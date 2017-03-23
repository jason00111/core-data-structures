'use strict'

export default class DirectedGraph { // really a weighted directed graph aka directed networks
  constructor () {
    this.elements = []
    this.orderedPairs = [] // [startVertex, endVertex, weight]
  }

  addVertex (vertex) {
    this.elements.push(vertex)
  }

  hasVertex (vertex) {
    return this.elements.includes(vertex)
  }

  addDirection (startVertex, endVertex, weight) {
    this.orderedPairs.push([startVertex, endVertex, weight])
  }

  hasDirection (startVertex, endVertex) {

    return this.orderedPairs.find(
      pair => pair[0] === startVertex && pair[1] === endVertex
    )

    ?

    true

    :

    false

  }

  getDirectionWeight (startVertex, endVertex) {
    if (!this.hasDirection(startVertex, endVertex)) return null

    return this.orderedPairs.find(
      pair => pair[0] === startVertex && pair[1] === endVertex
    )[2]
  }

  visit (startVertex, callback) {
    this.elements.forEach(callback)
  }

  findShortestPath (startVertex, endVertex) {
    //
  }

  removeDirection (startVertex, endVertex) {
    if (!this.hasDirection(startVertex, endVertex)) return

    const directionIndex = this.orderedPairs.findIndex(
      pair => pair[0] === startVertex && pair[1] === endVertex
    )

    this.orderedPairs.splice(directionIndex, 1)
  }

  getSeparatedVertices () {
    return this.elements.reduce((separatedVerticies, vertex, index, array) => {

      console.log(vertex, 'is at', index, 'in array', array)

      const indexInSeparatedVerticies = separatedVerticies.indexOf(vertex)

      const indexOfConnectedVertex = this.orderedPairs.findIndex(
        pair => pair.includes(vertex)
      )

      if ( indexOfConnectedVertex !== -1 ) {
        console.log('removing', vertex, 'at index', index)
        console.log('Before: separatedVerticies->', separatedVerticies)
        separatedVerticies.splice(indexInSeparatedVerticies, 1)
        console.log('After: separatedVerticies->', separatedVerticies)
      } else console.log('not removing', vertex)

      return separatedVerticies
    }, this.elements.slice())
  }

  removeVertex (vertexToRemove) {
    const elementIndex = this.elements.findIndex(
      element => element === vertexToRemove
    )

    this.elements.splice(elementIndex, 1)

    let directionIndex

    while ( directionIndex = this.orderedPairs.findIndex(
        pair => pair[0] === startVertex && pair[1] === endVertex
    )) {
      this.orderedPairs.splice(directionIndex, 1)
    }
  }

  count () {
    return this.elements.length
  }
}
