'use strict'

export default class PriorityQueue {
  constructor() {
    this.backIndex = -1
    this.data = []
  }

  enqueue(element, priority) {
    this.backIndex++
    this.data[this.backIndex] = {
      value: element,
      priority: priority
    }
  }

  dequeue() {
    if (this.backIndex === -1) {
      return null
    } else {
      this.backIndex--
      const frontElement = this.frontElement()
      this.data.splice(frontElement.index, 1)
      return frontElement.value
    }
  }

  frontElement() {
    return this.data.reduce(
      (accumulation, element, index) => {
        if (element.priority > accumulation.priority) {
          return {
            priority: element.priority,
            value: element.value,
            index: index
          }
        } else {
          return accumulation
        }
      }, {
        priority: -Infinity,
        value: null,
        index: null
      }
    )
  }

  backElement() {
    return this.data.reduceRight(
      (accumulation, element) => {
        if (element.priority < accumulation.priority) {
          return {
            priority: element.priority,
            value: element.value
          }
        } else {
          return accumulation
        }
      }, {
        priority: Infinity,
        value: null
      }
    )
  }

  front() {
    if (this.backIndex === -1) {
      return null
    } else {
      return this.frontElement().value
    }
  }

  back() {
    if (this.backIndex === -1) {
      return null
    } else {
      return this.backElement().value
    }
  }

  isEmpty() {
    if (this.backIndex === -1) return true
    else return false
  }

  length() {
    return this.backIndex + 1
  }
}
