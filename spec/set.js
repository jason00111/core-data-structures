import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import Set from '../src/set'

chai.use(chaiChange)

describe('Set', () => {
  'use strict'

  it('exists', () => {
    expect(Set).to.be.a('function')
  })

  it('new Set(array) creates a new set containing elelments of the array', () => {
    const mySet = new Set(['A', 'B', 'C'])
    const emptySet = new Set()

    expect(mySet.size()).to.eql(3)
    expect(mySet.contains('B')).to.be.true

    expect(emptySet.size()).to.eql(0)
  })

  context('add()', () => {
    it('adds an element to the set', () => {
      const mySet = new Set(['A', 'B', 'C'])

      expect(() => mySet.add('B'))
        .to.alter(() => mySet.size(), { from: 3, to: 3 })

      expect(() => mySet.add('D'))
        .to.alter(() => mySet.size(), { from: 3, to: 4 })
      expect(mySet.contains('D')).to.be.true
    })
  })

  context('isEmpty()', () => {
    it('checks to see if the set is empty.', () => {
      const mySet = new Set(['A'])
      const emptySet = new Set()

      expect(mySet.isEmpty()).to.be.false
      mySet.remove('A')
      expect(mySet.isEmpty()).to.be.true

      expect(emptySet.isEmpty()).to.be.true
    })
  })

  context('contains()', () => {
    it('checks to see if the set contains a particular element.', () => {
      const mySet = new Set(['A', 'B', 'C'])

      expect(mySet.contains('B')).to.be.true
      expect(mySet.contains('D')).to.be.false
    })
  })

  context('remove()', () => {
    it('removes an element from the set.', () => {
      const mySet = new Set(['A', 'B', 'C'])

      expect(mySet.contains('B')).to.be.true
      expect(() => mySet.remove('B'))
        .to.alter(() => mySet.size(), { from: 3, to: 2 })
      expect(mySet.contains('B')).to.be.false
      mySet.remove('B')
    })
  })

  context('iterate()', () => {
    it('calls a callback function on each element of the set', () => {
      const mySet = new Set(['A', 'B', 'C'])

      let numberOfElements = 0
      mySet.iterate(elem => numberOfElements++)
      expect(numberOfElements).to.eql(3)
    })
  })

  context('size()', () => {
    it('finds the size of the set.', () => {
      const mySet = new Set(['A', 'B', 'C'])
      const emptySet = new Set()

      expect(mySet.size()).to.eql(3)
      mySet.add('D')
      expect(mySet.size()).to.eql(4)

      expect(emptySet.size()).to.eql(0)
    })
  })

  context('union()', () => {
    it('finds the union of the set with a given set.', () => {
      const mySet = new Set(['A', 'B'])
      const mySetB = new Set(['B', 'C', 'D'])

      const unionSet = mySet.union(mySetB)
      expect(unionSet.size()).to.eql(4)
      unionSet.iterate(elem =>
        expect(['A', 'B', 'C', 'D'].indexOf(elem)).to.not.eql(-1)
      )
    })
  })

  context('difference()', () => {
    it('finds the elements in the set which are not in a given set.', () => {
      const mySet = new Set(['A', 'B', 'C', 'D', 'E'])
      const smallerSet = new Set(['C', 'B'])

      const diffSet = mySet.difference(smallerSet)
      expect(diffSet.size()).to.eql(3)
      diffSet.iterate(elem =>
        expect(mySet.contains(elem) && !smallerSet.contains(elem)).to.be.true
      )
    })
  })

  context('isSubset()', () => {
    it('checks to see if the set is a subset of a given set.', () => {
      const mySet = new Set(['A', 'B', 'C'])
      const mySetB = new Set(['C', 'B', 'E', 'A'])
      const mySetC = new Set(['E', 'B', 'C', 'D'])

      expect(mySet.isSubset(mySetB)).to.be.true
      expect(mySet.isSubset(mySetC)).to.be.false
    })
  })

  context('clone()', () => {
    it('clones a set.', () => {
      const mySet = new Set(['A', 'B', 'C'])
      const clonedSet = mySet.clone()

      expect(mySet.size()).to.eql(3)
      expect(clonedSet.size()).to.eql(3)

      clonedSet.iterate(elem =>
        expect(mySet.contains(elem)).to.be.true
      )

      clonedSet.add('D')
      expect(mySet.size()).to.eql(3)
      expect(clonedSet.size()).to.eql(4)
    })
  })
})
