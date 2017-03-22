import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import BinarySearchTree, { TreeNode } from '../src/BinarySearchTree'

chai.use(chaiChange)

describe('Binary search tree', () => {
  'use strict'

  it('exists', () => {
    expect(BinarySearchTree).to.be.a('function')
  })

  context('insert(3)', () => {
    it('inserts a node with the specified value into the tree.', () => {
      const myBST = new BinarySearchTree()

      expect(myBST.count()).to.eql(0)

      myBST.insert(3)

      expect(myBST.count()).to.eql(1)

      myBST.insert(4)

      expect(myBST.count()).to.eql(2)

      myBST.insert(2)

      expect(myBST.count()).to.eql(3)
    })
  })

  context.only('search(3)', () => {
    it('returns a node object', () => {
      const myBST = new BinarySearchTree()

      myBST.insert(3)

      expect(myBST.search(3)).to.be.an.instanceof(TreeNode)
      expect(myBST.search(3).getData()).to.eql(3)

      myBST.insert(4)
      myBST.insert(2)

      expect(myBST.search(2)).to.be.an.instanceof(TreeNode)
      expect(myBST.search(2).getData()).to.eql(2)

      expect(myBST.search(4)).to.be.an.instanceof(TreeNode)
      expect(myBST.search(4).getData()).to.eql(4)
    })

    it(' or null if not found.', () => {
      const myBST = new BinarySearchTree()

      expect(myBST.search(3)).to.be.null
    })

    it('can do this weird thing too', () => {
      const myBST = new BinarySearchTree()

      myBST.insert(3)
      myBST.insert(2)
      myBST.insert(1)

      expect(myBST.search(3)).to.be.an.instanceof(TreeNode)
      expect(myBST.search(2)).to.be.an.instanceof(TreeNode)
      expect(myBST.search(1)).to.be.an.instanceof(TreeNode)
      // expect(myBST.search(3).getData()).to.eql(3)

      // console.log('BEFORE: myBST', myBST)

      myBST.remove(3)

      // console.log('AFTER: myBST', myBST)

      // console.log('expected to be null myBST.search(3)...', myBST.search(3))
      // console.log('expected to be a TreeNode myBST.search(2)...', myBST.search(2))

      expect(myBST.search(3)).to.be.null
      expect(myBST.search(2)).to.be.an.instanceof(TreeNode) // search isn't working
      // expect(myBST.search(1)).to.be.an.instanceof(TreeNode)
    })
  })

  context('remove(3)', () => {
    it('removes an value\'s node (if exists) from the tree.  [root node no children]', () => {
      const myBST = new BinarySearchTree()

      myBST.insert(3)

      expect(myBST.search(3)).to.be.an.instanceof(TreeNode)
      expect(myBST.search(3).getData()).to.eql(3)

      myBST.remove(3)

      expect(myBST.search(3)).to.be.null
    })

    it('removes an value\'s node (if exists) from the tree.  [root node with right no left]', () => {
      const myBST = new BinarySearchTree()

      myBST.insert(3)
      myBST.insert(4)

      expect(myBST.search(3)).to.be.an.instanceof(TreeNode)
      expect(myBST.search(3).getData()).to.eql(3)

      myBST.remove(3)

      expect(myBST.search(3)).to.be.null
    })

    it('removes an value\'s node (if exists) from the tree.  [root node with left no right]', () => {
      const myBST = new BinarySearchTree()

      myBST.insert(3)
      myBST.insert(2)

      expect(myBST.search(3)).to.be.an.instanceof(TreeNode)
      expect(myBST.search(3).getData()).to.eql(3)

      myBST.remove(3)

      expect(myBST.search(3)).to.be.null
    })

    it('removes an value\'s node (if exists) from the tree.  [root node with left and right]', () => {
      const myBST = new BinarySearchTree()

      myBST.insert(3)
      myBST.insert(2)
      myBST.insert(1)

      expect(myBST.search(3)).to.be.an.instanceof(TreeNode)
      expect(myBST.search(3).getData()).to.eql(3)

      myBST.remove(3)

      expect(myBST.search(3)).to.be.null
      expect(myBST.search(2)).to.be.an.instanceof(TreeNode) // search isn't working
      // expect(myBST.search(1)).to.be.an.instanceof(TreeNode)
    })

    it('removes an value\'s node (if exists) from the tree.  [node with no right]', () => {
      const myBST = new BinarySearchTree()

      myBST.insert(3)
      myBST.insert(5)
      myBST.insert(4)

      expect(myBST.search(5)).to.be.an.instanceof(TreeNode)
      expect(myBST.search(5).getData()).to.eql(5)

      myBST.remove(5)

      expect(myBST.search(5)).to.be.null
    })

    it('removes an value\'s node (if exists) from the tree.  [node with no left]', () => {
      const myBST = new BinarySearchTree()

      myBST.insert(3)
      myBST.insert(4)
      myBST.insert(5)

      expect(myBST.search(4)).to.be.an.instanceof(TreeNode)
      expect(myBST.search(4).getData()).to.eql(4)

      myBST.remove(4)

      expect(myBST.search(4)).to.be.null
    })

    it('removes an value\'s node (if exists) from the tree.  [node with no left or right]', () => {
      const myBST = new BinarySearchTree()

      myBST.insert(3)
      myBST.insert(4)

      expect(myBST.search(4)).to.be.an.instanceof(TreeNode)
      expect(myBST.search(4).getData()).to.eql(4)

      myBST.remove(4)

      expect(myBST.search(4)).to.be.null
    })

    it('removes an value\'s node (if exists) from the tree.  [node with both left and right and root]', () => {
      const myBST = new BinarySearchTree()

      myBST.insert(3)
      myBST.insert(4)
      myBST.insert(2)

      expect(myBST.search(3).getLeft()).to.be.an.instanceof(TreeNode)
      expect(myBST.search(3).getRight()).to.be.an.instanceof(TreeNode)

      expect(myBST.search(3)).to.be.an.instanceof(TreeNode)
      expect(myBST.search(3).getData()).to.eql(3)

      myBST.remove(3)

      expect(myBST.search(3)).to.be.null
    })

    it('removes an value\'s node (if exists) from the tree.  [node with both left and right and not root]', () => {
      const myBST = new BinarySearchTree()

      myBST.insert(1)
      myBST.insert(3)
      myBST.insert(4)
      myBST.insert(2)

      expect(myBST.search(3).getLeft()).to.be.an.instanceof(TreeNode)
      expect(myBST.search(3).getRight()).to.be.an.instanceof(TreeNode)

      expect(myBST.search(3)).to.be.an.instanceof(TreeNode)
      expect(myBST.search(3).getData()).to.eql(3)

      myBST.remove(3)

      expect(myBST.search(3)).to.be.null
    })
  })

  context('traverse(callback)', () => {
    it('traverse the tree using in-order traversal and apply function on each node\'s value.', () => {
      const myBST = new BinarySearchTree()

      myBST.insert(3)
      myBST.insert(4)
      myBST.insert(5)
      myBST.insert(6)

      const resultArray = []

      myBST.traverse(value => resultArray.push(value))

      expect(resultArray).to.eql([3, 4, 5, 6])
    })
  })

  context('count()', () => {
    it('return the number of nodes in the tree.', () => {
      const myBST = new BinarySearchTree()

      expect(() => myBST.insert(3))
        .to.alter(() => myBST.count(), { from: 0, to: 1 })
    })
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

  context('findMin()', () => {
    it('finds the min node', () => {
      const myLeftTreeNode = new TreeNode({data: 3})
      const myRightTreeNode = new TreeNode({data: 11})
      const myParentTreeNode = new TreeNode({data: 7, left: myLeftTreeNode, right: myRightTreeNode})

      expect(myParentTreeNode.findMin()).to.be.an.instanceof(TreeNode)
      expect(myParentTreeNode.findMin().getData()).to.eql(3)
    })
  })

  context('amIParentOf(childNode)', () => {
    it('finds out if this is the parent of childNode', () => {
      const myLeftTreeNode = new TreeNode({data: 3})
      const myRightTreeNode = new TreeNode({data: 11})
      const myParentTreeNode = new TreeNode({data: 7, left: myLeftTreeNode, right: myRightTreeNode})

      const unconnectedTreeNode = new TreeNode({data: 12})

      expect(myParentTreeNode.amIParentOf(myLeftTreeNode)).to.eql(true)
      expect(myParentTreeNode.amIParentOf(myRightTreeNode)).to.eql(true)

      expect(myParentTreeNode.amIParentOf(unconnectedTreeNode)).to.eql(false)
    })
  })

  context('getParent()', () => {
    it('finds the parent of this', () => {
      const myBST = new BinarySearchTree()

      myBST.insert(7)
      myBST.insert(3)
      myBST.insert(11)

      const myLeftTreeNode = myBST.search(3)
      const myRightTreeNode = myBST.search(11)
      const myParentTreeNode = myBST.search(7)

      expect(myLeftTreeNode.getParent()).to.be.an.instanceof(TreeNode)
      expect(myRightTreeNode.getParent()).to.be.an.instanceof(TreeNode)

      expect(myLeftTreeNode.getParent()).to.eql(myParentTreeNode)
      expect(myRightTreeNode.getParent()).to.eql(myParentTreeNode)
    })
  })
})
