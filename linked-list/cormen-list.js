class Node {
  constructor(data) {
    this.data = data;
    /**
     * @type {Node}
     */
    this.prev = this.next = null;
  }
}

class LinkedList {
  /**
   * The max capacity of the list
   * @param {number} capacity
   */
  constructor(capacity) {
    /**
     * @type {Node}
     */
    this.head = this.tail = null;
    /**
     * @type {number}
     */
    this.capacity = capacity;
    /**
     * @type {number}
     */
     this.size = 0;
  }

  search(data) {
    let node = this.head;
    while (node != null && node.data != data) {
      node = node.next;
    }
    return node;
  }

  append(data) {
    const node = new Node(data);
    node.next = this.head;
    if (this.head != null) {
      this.head.prev = node;
    }
    this.head = node;
    node.prev = null;
    this.size++;
    return node;
  }

  remove(node=null) {
    if (node.prev != null) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
    if (node.next != null) {
      node.next.prev = node.prev;
    }
    size--;
  }
}

module.exports = {LinkedList};
