import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import HashTable, { Bucket } from '../src/hashTable'

chai.use(chaiChange)

describe('Hash table', () => {
  'use strict'

  it('exists', () => {
    expect(HashTable).to.be.a('function')
  })

  context('hash()', () => {
    it('generates a hash for the key "name"', () => {
      expect(HashTable.hash('name'))
        .to.be.a('number')

      expect(HashTable.hash('name'))
        .to.be.at.least(0)

      expect(HashTable.hash('name'))
        .to.be.at.most(9)
    })
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
      const values = []

      myHashTable.iterate((k, v) => {
        keys.push(k)
        values.push(v)
      })

      expect(keys.includes('name'))
        .to.eql(true)
      expect(keys.includes('title'))
        .to.eql(true)

      expect(values.includes('Zanzibar'))
        .to.eql(true)
      expect(values.includes('Sir'))
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
})



describe('Bucket', () => {
  'use strict'

  it('exists', () => {
    expect(Bucket).to.be.a('function')
  })

  context('add(key, value)', () => {
    it('adds a new key/value pair to the bucket', () => {
      const myBucket = new Bucket()
      expect(() => myBucket.add('name', 'Zanzibar'))
        .to.alter(() => myBucket.size(), { from: 0, to: 1 })
    })
  })

  context('find(key)', () => {
    it('returns -1 if there is no pair with the given key', () => {
      const myBucket = new Bucket()

      expect(myBucket.find('BumbleBrick')).to.eql(-1)
    })

    it('returns the value associated with a given key', () => {
      const myBucket = new Bucket()

      myBucket.add('name', 'Zanzibar')

      expect(myBucket.find('name')).to.eql('Zanzibar')
    })
  })

  context('getAll()', () => {
    it('returns an array of all the pairs', () => {
      const myBucket = new Bucket()

      myBucket.add('name', 'Zanzibar')
      myBucket.add('title', 'Sir')

      expect(myBucket.getAll()).to.be.an('array')
      expect(myBucket.getAll().length).to.eql(2)

      expect(
        myBucket
          .getAll()
          .find(pair => pair.key === 'name')
          .value
      ).to.eql('Zanzibar')

      expect(
        myBucket
          .getAll()
          .find(pair => pair.key === 'title')
          .value
      ).to.eql('Sir')
    })
  })

  context('remove()', () => {
    it('removes the pair with the given key', () => {
      const myBucket = new Bucket()

      myBucket.add('name', 'Zanzibar')

      expect(myBucket.find('name')).to.eql('Zanzibar')

      myBucket.remove('name')

      expect(myBucket.find('BumbleBrick')).to.eql(-1)
    })
  })

  context('size()', () => {
    it('returns the number of pairs in the bucket', () => {
      const myBucket = new Bucket()

      expect(myBucket.size()).to.eql(0)

      expect(() => myBucket.add('name', 'Zanzibar'))
        .to.alter(() => myBucket.size(), { from: 0, to: 1 })
    })
  })
})
