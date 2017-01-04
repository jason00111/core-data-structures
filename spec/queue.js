import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import Queue from '../src/queue'

chai.use(chaiChange)

describe('Queue', () => {
  'use strict'

  it('exists', () => {
    expect(Queue).to.be.a('function')
  })

  context('enqueue()', () => {
    it('adds an element to the back of the queue.', () => {
      const myQueue = new Queue()

      expect(() => myQueue.enqueue('foo'))
        .to.alter(() => myQueue.length(), { from: 0, to: 1 })
    })
  })

  context('dequeue()', () => {
    it('returns and removes an element from the front of the queue.', () => {
      const myQueue = new Queue()

      myQueue.enqueue('foo')
      myQueue.enqueue('bar')
      let dequeued
      expect(() => dequeued = myQueue.dequeue())
        .to.alter(() => myQueue.length(), { from: 2, to: 1 })
      expect(dequeued).to.eql('foo')
      myQueue.dequeue()
      expect(myQueue.dequeue()).to.be.null
    })
  })

  context('front()', () => {
    it('returns the front element in the queue.', () => {
      const myQueue = new Queue()

      myQueue.enqueue('foo')
      myQueue.enqueue('bar')
      expect(myQueue.front()).to.eql('foo')
      myQueue.dequeue()
      expect(myQueue.front()).to.eql('bar')
      myQueue.dequeue()
      expect(myQueue.front()).to.be.null
    })
  })

  context('back()', () => {
    it('returns the back element in the queue.', () => {
      const myQueue = new Queue()

      myQueue.enqueue('foo')
      myQueue.enqueue('bar')
      expect(myQueue.back()).to.eql('bar')
      myQueue.dequeue()
      expect(myQueue.back()).to.eql('bar')
      myQueue.dequeue()
      expect(myQueue.back()).to.be.null
    })
  })

  context('isEmpty()', () => {
    it('checks to see if the queue is empty.', () => {
      const myQueue = new Queue()

      myQueue.enqueue('foo')
      expect(myQueue.isEmpty()).to.be.false
      myQueue.dequeue()
      expect(myQueue.isEmpty()).to.be.true
    })
  })

  context('length()', () => {
    it('finds the length of the queue.', () => {
      const myQueue = new Queue()

      myQueue.enqueue('foo')
      myQueue.enqueue('bar')
      expect(myQueue.length()).to.eql(2)
      myQueue.dequeue()
      expect(myQueue.length()).to.eql(1)
    })
  })

})
