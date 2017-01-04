'use strict'

export default class Queue {
  constructor() {
    this.backPosition = -1
    this.data = []
  }

  enqueue(element) {
    this.backPosition++
    this.data[this.backPosition] = element
  }

  dequeue() {
    if (this.backPosition === -1) {
      return null
    } else {
      this.backPosition--
      return this.data.shift()
    }
  }

  front() {
    if (this.backPosition === -1) {
      return null
    } else {
      return this.data[0]
    }
  }

  back() {
    if (this.backPosition === -1) {
      return null
    } else {
      return this.data[this.backPosition]
    }
  }

  isEmpty() {
    if (this.backPosition === -1) return true
    else return false
  }

  length() {
    return this.backPosition + 1
  }
}
