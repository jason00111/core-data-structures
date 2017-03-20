'use strict'

export default class BinarySearchTree {
  constructor () {

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
}
