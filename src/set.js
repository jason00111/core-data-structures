'use strict'

export default class Set {
  constructor(elements = []) {
    this.data = elements.reduce((accumulation, element) => {
      if (accumulation.indexOf(element) === -1) {
        return accumulation.concat(element)
      } else {
        return accumulation
      }
    }, [])
  }

  add(element) {
    if (this.data.indexOf(element) === -1) {
      this.data.push(element)
    }
  }

  isEmpty() {
    if (this.data.length === 0) return true
    else return false
  }

  contains(element) {
    if (this.data.indexOf(element) !== -1) return true
    else return false
  }

  remove(element) {
    const index = this.data.indexOf(element)
    if (index !== -1) {
      this.data.splice(index, 1)
    }
  }

  iterate(callback) {
    this.data.forEach(callback)
  }

  size() {
    return this.data.length
  }

  union(otherSet) {
    let unionSet = this.clone()
    otherSet.iterate(element => unionSet.add(element))
    return unionSet
  }

  intersect(otherSet) {
    const commonElements = this.data.filter(
      element => otherSet.contains(element)
    )
    return new Set(commonElements)
  }

  difference(otherSet) {
    const uniqueElements = this.data.filter(
      element => !otherSet.contains(element)
    )
    return new Set(uniqueElements)
  }

  isSubset(otherSet) {
    return this.data.reduce((accumulation, element) => {
      if (!accumulation) return false
      else return otherSet.contains(element)
    }, true)
  }

  clone() {
    return new Set(this.data)
  }
}
