class Node {
  data = null
  prev = null
  next = null

  constructor(data) {
    this.data = data;
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
      this.#tail = node;
    } else  if (this.#size === 1) {
      this.#head.setNext(node);
      node.setPrev(this.#head);
      this.#tail = node;
    } else {
      this.#tail.setNext(node);
      node.setPrev(this.#tail);
    }
    this.#tail = node;
    this.#size++;
    return node;
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
    node.prev.setNext(node.next);
    node.next.setPrev(node.prev);
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
      if (Boolean(iter) && iter.data === data) {
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

module.exports = LinkedList;
