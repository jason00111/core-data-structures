'use strict'

export default class BinarySearchTree {
  constructor () {
    this.root = null
  }

  insert (value) {
    if (!this.root) {
      this.root = new TreeNode({data: value})
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
}

export class TreeNode {
  constructor (options) {
    this.data = options.data || null
    this.right = options.right || null
    this.left = options.left || null
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
      else this.left = new TreeNode({data: value})
    }
    else if ( value > this.data ) {
      if (this.right) this.right.push(value)
      else this.right = new TreeNode({data: value})
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

  removeMyself () {

  }

  traverse (callback) {
    if (this.left) this.left.traverse(callback)
    callback(this.data)
    if (this.right) this.right.traverse(callback)
  }
}
