import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import BinarySearchTree, { TreeNode } from '../src/BinarySearchTree'

chai.use(chaiChange)

describe('Binary search tree', () => {
  'use strict'

  it('exists', () => {
    expect(BinarySearchTree).to.be.a('function')
  })

  it('should do more stuff', () => {
    expect(4).to.be(3)
  })

})

describe('Tree node', () => {
  'use strict'

  it('exists', () => {
    expect(TreeNode).to.be.a('function')
  })

  context('getData()', () => {
    it('returns the node\'s data', () => {
      const myTreeNode = new TreeNode({data: 3})

      expect(myTreeNode.getData()).to.eql(3)
    })
  })

  context('getLeft()', () => {
    it('returns null if none', () => {
      const myTreeNode = new TreeNode({data: 3})

      expect(myTreeNode.getLeft()).to.be.null
    })

    it('returns the left node', () => {
      const myTreeNode = new TreeNode({data: 3})
      const mySecondTreeNode = new TreeNode({data: 7, left: myTreeNode})

      expect(mySecondTreeNode.getLeft()).to.be.an.instanceof(TreeNode)
      expect(mySecondTreeNode.getLeft().getData()).to.eql(3)
    })
  })

  context('setLeft(leastNode)', () => {
    it('changes the reference to the left node', () => {
      const myTreeNode = new TreeNode({data: 3})
      const mySecondTreeNode = new TreeNode({data: 7, left: myTreeNode})

      expect(mySecondTreeNode.getLeft()).to.be.an.instanceof(TreeNode)
      expect(mySecondTreeNode.getLeft().getData()).to.eql(3)

      const myThirdTreeNode = new TreeNode({data: 11})

      mySecondTreeNode.setLeft(myThirdTreeNode)

      expect(mySecondTreeNode.getLeft()).to.be.an.instanceof(TreeNode)
      expect(mySecondTreeNode.getLeft().getData()).to.eql(11)
    })

    it('returns the original node', () => {
      const myTreeNode = new TreeNode({data: 3})
      const mySecondTreeNode = new TreeNode({data: 7})

      const returnValue = mySecondTreeNode.setLeft(myTreeNode)

      expect(returnValue).to.be.an.instanceof(TreeNode)
      expect(returnValue.getData()).to.eql(7)
    })
  })

  context('getRight()', () => {
    it('returns null if none', () => {
      const myTreeNode = new TreeNode({data: 3})

      expect(myTreeNode.getRight()).to.be.null
    })

    it('returns the right node', () => {
      const myTreeNode = new TreeNode({data: 3})
      const mySecondTreeNode = new TreeNode({data: 7, right: myTreeNode})

      expect(mySecondTreeNode.getRight()).to.be.an.instanceof(TreeNode)
      expect(mySecondTreeNode.getRight().getData()).to.eql(3)
    })
  })

  context('setRight(leastNode)', () => {
    it('changes the reference to the right node', () => {
      const myTreeNode = new TreeNode({data: 3})
      const mySecondTreeNode = new TreeNode({data: 7, right: myTreeNode})

      expect(mySecondTreeNode.getRight()).to.be.an.instanceof(TreeNode)
      expect(mySecondTreeNode.getRight().getData()).to.eql(3)

      const myThirdTreeNode = new TreeNode({data: 11})

      mySecondTreeNode.setRight(myThirdTreeNode)

      expect(mySecondTreeNode.getRight()).to.be.an.instanceof(TreeNode)
      expect(mySecondTreeNode.getRight().getData()).to.eql(11)
    })

    it('returns the original node', () => {
      const myTreeNode = new TreeNode({data: 3})
      const mySecondTreeNode = new TreeNode({data: 7})

      const returnValue = mySecondTreeNode.setRight(myTreeNode)

      expect(returnValue).to.be.an.instanceof(TreeNode)
      expect(returnValue.getData()).to.eql(7)
    })
  })

})
