import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import Stack from '../src/stack'

chai.use(chaiChange)

describe('Stack', () => {
  'use strict'

  it('exists', () => {
    expect(Stack).to.be.a('function')
  })

  context('push()', () => {
    it('pushes an element to the top of the stack.', () => {
      const myStack = new Stack()

      expect(() => myStack.push('foo'))
        .to.alter(() => myStack.length(), { from: 0, to: 1 })
    })
  })

  context('pop()', () => {
    it('pops an element off the top of the stack.', () => {
      const myStack = new Stack()

      myStack.push('foo')
      myStack.push('bar')
      let popped
      expect(() => popped = myStack.pop())
        .to.alter(() => myStack.length(), { from: 2, to: 1 })
      expect(popped).to.eql('bar')
      myStack.pop()
      expect(myStack.pop()).to.be.null
    })
  })

  context('peek()', () => {
    it('peeks at the element at the top of the stack.', () => {
      const myStack = new Stack()

      myStack.push('foo')
      expect(myStack.peek()).to.eql('foo')
      myStack.pop()
      expect(myStack.peek()).to.be.null
    })
  })

  context('isEmpty()', () => {
    it('checks to see if the stack is empty.', () => {
      const myStack = new Stack()

      myStack.push('foo')
      expect(myStack.isEmpty()).to.be.false
      myStack.pop()
      expect(myStack.isEmpty()).to.be.true
    })
  })

  context('length()', () => {
    it('finds the length of the stack.', () => {
      const myStack = new Stack()

      myStack.push('foo')
      myStack.push('bar')
      expect(myStack.length()).to.eql(2)
      myStack.pop()
      expect(myStack.length()).to.eql(1)
    })
  })
})
