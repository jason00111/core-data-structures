'use strict'

export default class Stack {
  constructor() {
    this.top = 0
    this.data = []
  }

  push(element) {
    this.top++
    this.data[this.top] = element
  }

  pop() {
    if (this.top === 0) {
      return null
    } else {
      this.top--
      return this.data[this.top + 1]
    }
  }

  peek() {
    if (this.top === 0) {
      return null
    } else {
      return this.data[this.top]
    }
  }

  isEmpty() {
    if (this.top === 0) return true
    else return false
  }

  length() {
    return this.top
  }
}
