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
    if (this.imRoot()) this.removeMyselfRoot()
    else if (this.imALeaf()) this.removeMyselfLeaf()
    else if (this.imATwig()) this.removeMyselfTwig()
    else if (this.imAFork()) this.removeMyselfFork()
  }

  removeMyselfRoot () {
    if (this.getRight()) this.removeMyselfFork()
    else if (this.getLeft()) this.removeMyselfForkLeft()
    else this.data = null
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

  removeMyselfFork () { //fork has two children
    console.log('here we are, trying to remove', this)
    console.log('this.imRoot():', this.imRoot())
    console.log('this.imALeaf():', this.imALeaf())
    console.log('this.imATwig():', this.imATwig()) //problem here
    console.log('this.imAFork():', this.imAFork()) //and here
    const minRightTreeNode = this.right.findMin()

    this.data = minRightTreeNode.getData()
    minRightTreeNode.removeMyselfTwig()
  }

  removeMyselfForkLeft () {
    const maxLeftTreeNode = this.left.findMax()
    this.data = maxLeftTreeNode.getData()
    maxLeftTreeNode.removeMyselfTwig()
  }

  imRoot () {
    return this.bst.root === this
  }

  imALeaf () { //leaf has no children
    return !(this.getLeft() || this.getRight())
  }

  imATwig () { //twig has only one child
    if (this.imRoot()) return false //remove this?
    return !(this.getRight() && this.getLeft()) && (this.getRight() || this.getLeft())
  }

  imAFork () { //fork has two children
    if (this.imRoot()) return false //remove this?
    return this.getRight() && this.getLeft()
  }

  getChild () {
    return this.getRight() ? this.getRight() : this.getLeft() ? this.getLeft() : null
  }

  imLeft () {
    return this === this.getParent().getLeft()
  }

  imRight () {
    return this === this.getParent().getRight()
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
