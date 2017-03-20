'use strict'

export default class HashTable {
  constructor () {
    this.buckets = Array(10).fill(null).map(() => new Bucket())
  }

  put (key, value) {
    const bucketNumber = HashTable.hash(key)
    this.buckets[bucketNumber].add(key, value)
  }

  get (key) {
    const bucketNumber = HashTable.hash(key)
    return this.buckets[bucketNumber].find(key)
  }

  contains (key) {
    const bucketNumber = HashTable.hash(key)
    return this.buckets[bucketNumber].find(key) !== -1
  }

  iterate (callback) {
    const allPairs = this.buckets.reduce(
      (all, bucket) => all.concat(bucket.getAll()),
      []
    )

    allPairs.forEach(pair => callback(pair.key, pair.value))
  }

  remove (key) {
    const bucketNumber = HashTable.hash(key)
    this.buckets[bucketNumber].remove(key)
  }

  size () {
    return this.buckets.reduce(
      (size, bucket) => size + bucket.size(),
      0
    )
  }

  static hash (key) {
    return key
      .split('')
      .reduce(
        (total, character) => total + character.charCodeAt(0),
        0
      ) % 10
  }
}

export class Bucket {
  constructor () {
    this.things = {}
  }

  add (key, value) {
    this.things[key] = value
  }

  find (key) {
    if (key in this.things) {
      return this.things[key]
    } else {
      return -1
    }
  }

  getAll () {
    const arrayOfThings = []

    for (const key in this.things) {
      arrayOfThings.push({
        key: key,
        value: this.things[key]
      })
    }

    return arrayOfThings
  }

  remove (key) {
    delete this.things[key]
  }

  size () {
    return Object.keys(this.things).length
  }
}
