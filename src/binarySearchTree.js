'use strict'

export default class BinarySearchTree {
  constructor () {
    this.root = null
  }

  insert (value) {
    if (!this.root) {
      this.root = new TreeNode({data: value, bst: this})
    } else {
      this.root.push(value)
    }
  }

  count () {
    if (!this.root) {
      return 0
    } else {
      return 1 + this.root.countChildren()
    }
  }

  search (value) {
    return this.root ? this.root.search(value) : null
  }

  remove (value) {
    if (!this.root) return

    const foundNode = this.root.search(value)

    if (foundNode) foundNode.removeMyself()
  }

  traverse (callback) {
    if (!this.root) return
    this.root.traverse(callback)
  }

  traverseNodes (callback) {
    if (!this.root) return
    this.root.traverseNodes(callback)
  }
}

export class TreeNode {
  constructor (options) {
    this.data = options.data || null // || throw error
    this.right = options.right || null
    this.left = options.left || null
    this.bst = options.bst  // || throw error
  }

  getData () {
    return this.data || null
  }

  getLeft () {
    return this.left || null
  }

  getRight () {
    return this.right || null
  }

  setLeft (treeNode) {
    this.left = treeNode
    return this
  }

  setRight (treeNode) {
    this.right = treeNode
    return this
  }

  push (value) {
    if (!this.data) this.data = value
    else if ( value === this.data ) return
    else if ( value < this.data ) {
      if (this.left) this.left.push(value)
      else this.left = new TreeNode({data: value, bst: this.bst})
    }
    else if ( value > this.data ) {
      if (this.right) this.right.push(value)
      else this.right = new TreeNode({data: value, bst: this.bst})
    }
  }

  countChildren () {
    let noOfChildren = 0

    if (this.left) noOfChildren += 1 + this.left.countChildren()
    if (this.right) noOfChildren += 1 + this.right.countChildren()

    return noOfChildren
  }

  search (value) {
    if (!this.data) return null
    if (this.data === value) return this
    else if (value < this.data) {
      if (!this.left) return null
      return this.left.search(value)
    }
    else if (value > this.data) {
      if (!this.right) return null
      return this.right.search(value)
    }
  }

  traverse (callback) {
    if (this.left) this.left.traverse(callback)
    callback(this.data)
    if (this.right) this.right.traverse(callback)
  }

  traverseNodes (callback) {
    if (this.left) this.left.traverseNodes(callback)
    callback.bind(this)(this)
    if (this.right) this.right.traverseNodes(callback)
  }

  findMin () {
    if (!this.left) return this
    return this.left.findMin()
  }

  findMax () {
    if (!this.right) return this
    return this.right.findMax()
  }

  removeMyself () {
    const closeSideTreeNode = this.right
      ? this.right.findMin()
      : this.left
        ? this.left.findMax()
        : null

    if (closeSideTreeNode) {
      this.data = closeSideTreeNode.getData()
      closeSideTreeNode.removeMyselfTwig()
    } else {
      this.removeMyselfLeaf()
    }
  }

  removeMyselfLeaf () { //leaf has no children
    if (this.imLeft()) this.getParent().setLeft(null)
    else if (this.imRight()) this.getParent().setRight(null)
  }

  removeMyselfTwig () { //twig has only one child
    if (this.imLeft()) {
      this.getParent().setLeft(this.getChild())
    } else if (this.imRight()) {
      this.getParent().setRight(this.getChild())
    }
  }

  getChild () {
    return this.getRight() ? this.getRight() : this.getLeft() ? this.getLeft() : null
  }

  imLeft () {
    return this.getData() < this.getParent().getData()
  }

  imRight () {
    return this.getData() > this.getParent().getData()
  }

  amIParentOf (childNode) {
    if (!childNode) return // throw error

    return childNode === this.getLeft() || childNode === this.getRight()
  }

  getParent () {
    let parentNode

    const self = this

    this.bst.traverseNodes(function (node) {
      if (node.amIParentOf(self)) parentNode = this
    })

    return parentNode
  }
}
