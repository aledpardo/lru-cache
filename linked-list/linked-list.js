class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }

  setPrev(prev) {
    this.prev = prev
  }
  setNext(next) {
    this.next = next
  }
}

class LinkedList {
  /**
   * @type {number}
   */
  #capacity = 0;
  /**
   * @type {number}
   */
  #size = 0;
  /**
   * @type {Node}
   */
  #head = null;
  /**
   * @type {Node}
   */
  #tail = null;

  constructor(capacity = 0) {
    this.#capacity = capacity;
  }

  /**
   * Appends `data` to the end of list
   * @param {T} data
   * @returns {Node}
   */
  append(data) {
    const node = new Node(data);
    if (this.#size === this.#capacity) {
      this.remove(this.#head);
    }
    if (this.#size === 0) {
      this.#head = node;
    } else {
      this.#tail.setNext(node);
      node.setPrev(this.#tail);
    }
    this.#tail = node;
    this.#size++;
    return node;
  }

  first() {
    return this.#head;
  }

  last() {
    return this.#tail;
  }

  moveToTail(node) {
    if (node === null) {
      return false;
    }
    if (node === this.#tail) {
      return true;
    }
    if (node === this.#head) {
      this.#head.next.setPrev(null);
      this.#head = this.#head.next;
    } else {
      node.prev.setNext(node.next);
      node.next.setPrev(node.prev);
    }
    node.setPrev(this.#tail);
    node.setNext(null);
    this.#tail = node;
  }

  /**
   * Removes node from list
   * @param {Node} node
   * @returns {boolean}
   */
  remove(node) {
    if (node == null) {
      return false;
    }
    if (node === this.#head) {
      this.#head = this.#head.next
      if (this.#head != null) {
        this.#head.setPrev(null);
      }
      this.#size--;
      return true;
    }
    if (node === this.#tail) {
      this.#tail = node.prev;
    } else {
      node.next.setPrev(node.prev);
    }
    node.prev.setNext(node.next);
    this.#size--;
    return true;
  }

  /**
   * Finds a {Node} by reference
   * @param {Node} node
   * @returns Node
   */
  find(data) {
    for (const iter of this) {
      if (iter != null && iter.data === data) {
        return iter;
      }
    }
    return null;
  }

  /**
   *
   * @returns {Iterable<Node>}
   */
  *[Symbol.iterator]() {
    let iter = this.#head;;
    do {
      yield iter;
      iter = iter?.next;
    } while(iter != null);
    return null;
  }
}

module.exports = {
  LinkedList,
  Node
};
