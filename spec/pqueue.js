import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import PriorityQueue from '../src/pqueue'

chai.use(chaiChange)

describe('PriorityQueue', () => {
  'use strict'

  it('exists', () => {
    expect(PriorityQueue).to.be.a('function')
  })

  context('enqueue()', () => {
    it('adds an element to the back of the priority queue.', () => {
      const myPQueue = new PriorityQueue()

      expect(() => myPQueue.enqueue('pizza', 100))
        .to.alter(() => myPQueue.length(), { from: 0, to: 1 })
    })
  })

  context('dequeue()', () => {
    it('returns and removes an element from the front of the priority queue.', () => {
      const myPQueue = new PriorityQueue()

      myPQueue.enqueue('pizza', 50)
      myPQueue.enqueue('cake', 100)
      let dequeued
      expect(() => dequeued = myPQueue.dequeue())
        .to.alter(() => myPQueue.length(), { from: 2, to: 1 })
      expect(dequeued).to.eql('cake')
      myPQueue.dequeue()
      expect(myPQueue.dequeue()).to.be.null
    })
  })

  context('front()', () => {
    it('returns the front element in the priority queue.', () => {
      const myPQueue = new PriorityQueue()

      myPQueue.enqueue('pizza', 50)
      myPQueue.enqueue('cake', 100)
      myPQueue.enqueue('candy', 100)
      expect(myPQueue.front()).to.eql('cake')
      myPQueue.dequeue()
      expect(myPQueue.front()).to.eql('candy')
      myPQueue.dequeue()
      expect(myPQueue.front()).to.eql('pizza')
      myPQueue.dequeue()
      expect(myPQueue.front()).to.be.null
    })
  })

  context('back()', () => {
    it('returns the back element in the priority queue.', () => {
      const myPQueue = new PriorityQueue()

      myPQueue.enqueue('pizza', 50)
      myPQueue.enqueue('cake', 100)
      myPQueue.enqueue('candy', 100)
      expect(myPQueue.back()).to.eql('pizza')
      myPQueue.dequeue()
      expect(myPQueue.back()).to.eql('pizza')
      myPQueue.dequeue()
      expect(myPQueue.back()).to.eql('pizza')
      myPQueue.dequeue()
      expect(myPQueue.back()).to.be.null
    })
  })

  context('isEmpty()', () => {
    it('checks to see if the priority queue is empty.', () => {
      const myPQueue = new PriorityQueue()

      myPQueue.enqueue('pizza', 100)
      expect(myPQueue.isEmpty()).to.be.false
      myPQueue.dequeue()
      expect(myPQueue.isEmpty()).to.be.true
    })
  })

  context('length()', () => {
    it('finds the length of the priority queue.', () => {
      const myPQueue = new PriorityQueue()

      myPQueue.enqueue('pizza', 50)
      myPQueue.enqueue('cake', 100)
      expect(myPQueue.length()).to.eql(2)
      myPQueue.dequeue()
      expect(myPQueue.length()).to.eql(1)
    })
  })

})
