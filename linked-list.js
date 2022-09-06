class Node {
  data = {}
  prev = null
  next = null

  constructor(data) {
    this.data = data
  }

  setPrev(prev) {
    this.prev = prev
  }
  setNext(next) {
    this.next = next
  }
}

export class LinkedList {
  #capacity = 0
  #size = 0
  #head = new Node()
  #tail = new Node()

  constructor(capacity = 0) {
    this.#capacity = capacity
    this.#size = 0
  }

  append(node = new Node()) {
    if (this.#size === this.#capacity) {
      this.remove(this.#head)
    }
    node.setPrev(this.#tail)
    node.setNext(null)
    this.#tail.setNext(node)
    this.#tail = node
  }

  remove(node = new Node()) {
    if (node === this.#head) {
      this.#head = this.#head.next
      this.#head.setPrev(null)
      return
    }
    node.prev.setNext(node.next)
    node.next.setPrev(node.prev)
  }
}
