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

  context('addDirection(\'v1\', \'v2\' , 3)', () => {
    it('adds a direction from \'v1\' to \'v2\' with a weight (number).', () => {
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

  context('hasDirection(\'v1\', \'v2\')', () => {
    it('returns true if there\'s a direction from \'v1\' to \'v2\'.', () => {
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

  context('getDirectionWeight(\'v1\', \'v2\')', () => {
    it('returns direction weight between v1 & v2 or null if no direction exists.', () => {
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

    })
  })

  context('findShortestPath(\'v1\', \'v2\')', () => {
    it('returns an array of all the shortest paths between two vertices based on the sum of weights.', () => {

    })
  })

  context('removeDirection(\'v1\', \'v2\')', () => {
    it('removes an existing direction between \'v1\' and \'v2\'.', () => {

    })
  })

  context('getSeparatedVertices()', () => {
    it('returns an array of all the vertices that are separated from the graph.', () => {

    })
  })

  context('removeVertex(\'v1\')', () => {
    it('removes an existing vertex and all its directions (the incoming and outgoing).', () => {

    })
  })

  context('count()', () => {
    it('returns the number of vertices in the graph.', () => {

    })
  })

})
