import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import HashTable from '../src/hashTable'

chai.use(chaiChange)

describe('Hash table', () => {
  'use strict'

  it('exists', () => {
    expect(HashTable).to.be.a('function')
  })

  context('put()', () => {
    it('adds a key-value pair to the hash table.', () => {
      const myHashTable = new HashTable()

      expect(() => myHashTable.put('name', 'Zanzibar'))
        .to.alter(() => myHashTable.size(), { from: 0, to: 1 })
    })
  })

  context('get()', () => {
    it('returns the data associated with key.', () => {
      const myHashTable = new HashTable()
      myHashTable.put('name', 'Zanzibar')

      expect(myHashTable.get('name'))
        .to.eql('Zanzibar')
    })
  })

  context('contains()', () => {
    it('returns true if the hash table contains the key.', () => {
      const myHashTable = new HashTable()
      myHashTable.put('name', 'Zanzibar')

      expect(myHashTable.contains('name'))
        .to.eql(true)
    })
  })

  context('iterate()', () => {
    it('takes a callback function and passes it each key and value in sequence.', () => {
      const myHashTable = new HashTable()
      myHashTable.put('name', 'Zanzibar')
      myHashTable.put('title', 'Sir')

      const keys = []

      myHashTable.iterate((k, v) => keys.push(k))

      expect(key.includes('name'))
        .to.eql(true)
      expect(key.includes('title'))
        .to.eql(true)
    })
  })

  context('remove()', () => {
    it('removes a key-value pair by key.', () => {
      const myHashTable = new HashTable()
      myHashTable.put('name', 'Zanzibar')

      expect(() => myHashTable.remove('name'))
        .to.alter(() => myHashTable.size(), { from: 1, to: 0 })
    })
  })

  context('size()', () => {
    it('returns the number of key-value pairs in the hash table.', () => {
      const myHashTable = new HashTable()

      expect(() => myHashTable.put('name', 'Zanzibar'))
        .to.alter(() => myHashTable.size(), { from: 0, to: 1 })

      expect(() => myHashTable.remove('name'))
        .to.alter(() => myHashTable.size(), { from: 1, to: 0 })
    })
  })

  context('hash()', () => {
    it('generates a hash for the key "name"', () => {
      expect(HashTable.hash('name'))
        .to.be.a('string')
    })
  })
})
