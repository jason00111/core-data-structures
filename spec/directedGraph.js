import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import DirectedGraph from '../src/directedGraph'

chai.use(chaiChange)

describe('Directed graph', () => {
  'use strict'

  it('exists', () => {
    expect(DirectedGraph).to.be.a('function')
  })

  context('addVertex(\'v1\')', () => {
    it('adds a vertex to the graph.', () => {
      const myDirectedGraph = new DirectedGraph()

      expect(() => myDirectedGraph.addVertex('v1'))
        .to.alter(() => myDirectedGraph.count(), { from: 0, to: 1 })

      expect(() => myDirectedGraph.addVertex('v2'))
        .to.alter(() => myDirectedGraph.count(), { from: 1, to: 2 })
    })
  })

  context('hasVertex(\'v1\')', () => {
    it('returns true if the graph contains the vertex or false if not.', () => {
      const myDirectedGraph = new DirectedGraph()

      expect(myDirectedGraph.hasVertex('v1')).to.eql(false)

      myDirectedGraph.addVertex('v1')

      expect(myDirectedGraph.hasVertex('v1')).to.eql(true)
    })
  })

  context('addDirection, hasDirection, getDirectionWeight', () => {
    it('addDirection(\'v1\', \'v2\' , 3)... adds a direction from \'v1\' to \'v2\' with a weight (number).'
      + 'hasDirection(\'v1\', \'v2\')... returns true if there\'s a direction from \'v1\' to \'v2\'.'
      + 'getDirectionWeight(\'v1\', \'v2\')... returns direction weight between v1 & v2 or null if no direction exists.', () => {
      const myDirectedGraph = new DirectedGraph()

      myDirectedGraph.addVertex('v1')
      myDirectedGraph.addVertex('v2')

      expect(myDirectedGraph.hasDirection('v1', 'v2')).to.eql(false)
      expect(myDirectedGraph.getDirectionWeight('v1', 'v2')).to.be.null

      myDirectedGraph.addDirection('v1', 'v2', 3)

      expect(myDirectedGraph.hasDirection('v1', 'v2')).to.eql(true)
      expect(myDirectedGraph.getDirectionWeight('v1', 'v2')).to.eql(3)
    })
  })

  context('visit( \'v1\', vertex => console.log(vertex))', () => {
    it('visit all the connected vertices in the graph starting with v1 and apply function on the reached vertex.', () => {
      const myDirectedGraph = new DirectedGraph()

      myDirectedGraph.addVertex('v1')
      myDirectedGraph.addVertex('v2')
      myDirectedGraph.addDirection('v1', 'v2', 3)

      const visitedVerticies = []

      myDirectedGraph.visit('v1', vertex => visitedVerticies.push(vertex))

      expect(visitedVerticies).to.eql(['v1', 'v2'])
    })
  })

  context('findShortestPaths(\'v1\', \'v2\')', () => {
    it('returns null if there is no path', () => {
      const myDirectedGraph = new DirectedGraph()

      myDirectedGraph.addVertex('v1')
      myDirectedGraph.addVertex('v2')
      myDirectedGraph.addVertex('v3')
      myDirectedGraph.addVertex('v4')
      myDirectedGraph.addDirection('v1', 'v2', 3)
      myDirectedGraph.addDirection('v1', 'v3', 3)

      expect(myDirectedGraph.findShortestPaths('v1', 'v4')).to.be.null
    })

    it('returns an array of all the shortest paths between two vertices based on the sum of weights. test 1', () => {
      const myDirectedGraph = new DirectedGraph()

      myDirectedGraph.addVertex('v1')
      myDirectedGraph.addVertex('v2')
      myDirectedGraph.addVertex('v3')
      myDirectedGraph.addVertex('v4')
      myDirectedGraph.addDirection('v1', 'v2', 3)
      myDirectedGraph.addDirection('v1', 'v3', 3)
      myDirectedGraph.addDirection('v2', 'v4', 3)
      myDirectedGraph.addDirection('v3', 'v4', 3)

      expect(myDirectedGraph.findShortestPaths('v1', 'v4')).to.be.an('array')
      expect(myDirectedGraph.findShortestPaths('v1', 'v4').length).to.eql(2)
      expect(
        myDirectedGraph.findShortestPaths('v1', 'v4')
        .find(path => path[0] === 'v1' && path[1] === 'v2' && path[2] === 'v4')
      ).to.be.an('array')
      expect(
        myDirectedGraph.findShortestPaths('v1', 'v4')
        .find(path => path[0] === 'v1' && path[1] === 'v3' && path[2] === 'v4')
      ).to.be.an('array')
    })

    it('returns an array of all the shortest paths between two vertices based on the sum of weights. test 2', () => {
      const myDirectedGraph = new DirectedGraph()

      myDirectedGraph.addVertex('v1')
      myDirectedGraph.addVertex('v2')
      myDirectedGraph.addVertex('v3')
      myDirectedGraph.addVertex('v4')
      myDirectedGraph.addDirection('v1', 'v2', 3)
      myDirectedGraph.addDirection('v1', 'v3', 5)
      myDirectedGraph.addDirection('v2', 'v4', 3)
      myDirectedGraph.addDirection('v3', 'v4', 5)

      expect(myDirectedGraph.findShortestPaths('v1', 'v4')).to.be.an('array')
      expect(myDirectedGraph.findShortestPaths('v1', 'v4').length).to.eql(1)
      expect(
        myDirectedGraph.findShortestPaths('v1', 'v4')
        .find(path => path[0] === 'v1' && path[1] === 'v2' && path[2] === 'v4')
      ).to.be.an('array')
    })
  })

  context('removeDirection(\'v1\', \'v2\')', () => {
    it('removes an existing direction between \'v1\' and \'v2\'.', () => {
      const myDirectedGraph = new DirectedGraph()

      myDirectedGraph.addVertex('v1')
      myDirectedGraph.addVertex('v2')

      myDirectedGraph.addDirection('v1', 'v2', 3)

      expect(myDirectedGraph.hasDirection('v1', 'v2')).to.eql(true)

      myDirectedGraph.removeDirection('v1', 'v2')

      expect(myDirectedGraph.hasDirection('v1', 'v2')).to.eql(false)
    })
  })

  context('getSeparatedVertices()', () => {
    it('returns an array of all the vertices that are unconnected to the graph (have no direction linking them to another vertex).', () => {
      const myDirectedGraph = new DirectedGraph()

      myDirectedGraph.addVertex('vA')
      myDirectedGraph.addVertex('vB')
      myDirectedGraph.addVertex('v1')
      myDirectedGraph.addVertex('v2')
      myDirectedGraph.addVertex('v3')
      myDirectedGraph.addVertex('v4')
      myDirectedGraph.addVertex('vC')
      myDirectedGraph.addVertex('vD')
      myDirectedGraph.addDirection('v1', 'v2', 3)
      myDirectedGraph.addDirection('v1', 'v3', 5)
      myDirectedGraph.addDirection('v2', 'v4', 3)
      myDirectedGraph.addDirection('v3', 'v4', 5)
      myDirectedGraph.addVertex('vE')
      myDirectedGraph.addVertex('vF')

      const separatedVerticies = myDirectedGraph.getSeparatedVertices()

      expect(separatedVerticies).to.be.an('array')
      expect(separatedVerticies.length).to.eql(6)

      expect(separatedVerticies.includes('vA')).to.eql(true)
      expect(separatedVerticies.includes('vB')).to.eql(true)
      expect(separatedVerticies.includes('vC')).to.eql(true)
      expect(separatedVerticies.includes('vD')).to.eql(true)
      expect(separatedVerticies.includes('vE')).to.eql(true)
      expect(separatedVerticies.includes('vF')).to.eql(true)
    })
  })

  context('removeVertex()', () => {
    it('removes an existing vertex and all its directions (the incoming and outgoing).', () => {
      const myDirectedGraph = new DirectedGraph()

      myDirectedGraph.addVertex('v1')
      myDirectedGraph.addVertex('v2')
      myDirectedGraph.addVertex('v3')
      myDirectedGraph.addVertex('v4')
      myDirectedGraph.addDirection('v1', 'v2', 3)
      myDirectedGraph.addDirection('v1', 'v3', 5)
      myDirectedGraph.addDirection('v2', 'v4', 3)
      myDirectedGraph.addDirection('v3', 'v4', 5)

      expect(myDirectedGraph.count()).to.eql(4)

      myDirectedGraph.removeVertex('v2')

      expect(myDirectedGraph.count()).to.eql(3)
      expect(myDirectedGraph.hasVertex('v2')).to.eql(false)
      expect(myDirectedGraph.hasDirection('v1', 'v2')).to.eql(false)
      expect(myDirectedGraph.hasDirection('v2', 'v4')).to.eql(false)
    })
  })

  context('count()', () => {
    it('returns the number of vertices in the graph.', () => {
      const myDirectedGraph = new DirectedGraph()

      expect(() => myDirectedGraph.addVertex('v1'))
        .to.alter(() => myDirectedGraph.count(), { from: 0, to: 1 })

      expect(() => myDirectedGraph.addVertex('v2'))
        .to.alter(() => myDirectedGraph.count(), { from: 1, to: 2 })
    })
  })

})
