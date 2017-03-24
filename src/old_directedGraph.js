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

  // findShortestPathsAndWeights (startVertex, endVertex) {
  //   // console.log('finding shortest paths and weights from', startVertex, 'to', endVertex)
  //
  //   if (startVertex === endVertex) {
  //     // console.log(startVertex, '===', endVertex)
  //     return [{path: [endVertex], weight: 0}]
  //   } //else console.log(startVertex, '!==', endVertex)
  //
  //   const shortPaths = []
  //
  //   const directionsStartingAtStart = this.findDirectionsStartingAt(startVertex)
  //
  //   // console.log('directionsStartingAtStart', directionsStartingAtStart)
  //
  //   if (directionsStartingAtStart.length === 0) {
  //     return []
  //   }
  //
  //   directionsStartingAtStart.forEach(direction => {
  //
  //     const shortestPathsAndWeights = this.findShortestPathsAndWeights(direction[1], endVertex)
  //
  //     shortPaths.push({
  //       path: [startVertex].concat(shortestPathsAndWeights.path),
  //       weight: direction.weight + shortestPathsAndWeights.weight
  //     })
  //   })
  //
  //   const shortestPaths = shortPaths.reduce((shortestPaths, path) => {
  //     let copyOfShortestPaths = shortPaths.slice()
  //     if (path.weight === copyOfShortestPaths[0].weight) {
  //       copyOfShortestPaths.push(path)
  //     } else if (path.weight < copyOfShortestPaths[0].weight) {
  //       copyOfShortestPaths = [path]
  //     }
  //
  //     return copyOfShortestPaths
  //   }, [])
  //
  //   return shortestPaths
  // }

  // findDirectionsStartingAt (startVertex) {
  //   return this.orderedPairs.filter(direction => direction[0] === startVertex)
  // }
  //
  // findShortestPath (startVertex, endVertex) { //should be findShortestPaths
  //   const firstThing = this.findShortestPathsAndWeights(startVertex, endVertex)
  //   // console.log('---->', firstThing)
  //   const thing = firstThing.map(pathAndWeight => pathAndWeight.path)
  //   // console.log('--->', thing)
  //   return thing
  // }




  // findShortestPath (startVertex, endVertex) {
  //   if (startVertex === endVertex) {
  //     return
  //   }
  //
  //   this.findDirectionsFrom(startVertex).forEach(direction => {
  //     findShortestPath(direction[1], endVertex)
  //   })
  // }
  //
  // findWeightOfPath (startVertex, endVertex) {
  //   if (startVertex === endVertex) {
  //     return 0
  //   }
  //
  //   findOrderedPairsStartingAt(startVertex).reduce((accumulator, pair) => {
  //
  //     const weight = findWeightOfPath(pair[1], endVertex)
  //
  //     if ( weight < Infinity ) accumulator.push({
  //       weight: weight, vertex: pair[1]
  //     })
  //
  //     return accumulator
  //   }, [])
  //
  // }
  //
  // findOrderedPairsStartingAt (startVertex) {
  //   return this.orderedPairs.filter(direction => direction[0] === startVertex)
  // }

  removeDirection (startVertex, endVertex) {
    if (!this.hasDirection(startVertex, endVertex)) return

    const directionIndex = this.orderedPairs.findIndex(
      pair => pair[0] === startVertex && pair[1] === endVertex
    )

    this.orderedPairs.splice(directionIndex, 1)
  }

  getSeparatedVertices () {
    return this.elements.reduce((separatedVerticies, vertex, index) => {

      const indexInSeparatedVerticies = separatedVerticies.indexOf(vertex)

      const indexOfConnectedVertex = this.orderedPairs.findIndex(
        pair => pair.includes(vertex)
      )

      if ( indexOfConnectedVertex !== -1 ) {
        separatedVerticies.splice(indexInSeparatedVerticies, 1)
      }

      return separatedVerticies
    }, this.elements.slice())
  }

  removeVertex (vertexToRemove) {
    const elementIndex = this.elements.findIndex(
      element => element === vertexToRemove
    )

    this.elements.splice(elementIndex, 1)

    let directionIndex

    while (directionIndex !== -1) {
      directionIndex = this.orderedPairs.findIndex(
          pair => pair[0] === vertexToRemove || pair[1] === vertexToRemove
      )

      if (directionIndex !== -1) {
        this.orderedPairs.splice(directionIndex, 1)
      }
    }
  }

  count () {
    return this.elements.length
  }
}
