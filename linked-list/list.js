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

  append(data) {
    const node = new Node(data);

    if (this.head == null) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail = node;
    }
    this.size++;
    return node;
  }

  remove(node=null) {
    if (node != null) {
      if (node.prev != null) {
        node.prev.next = node.next;
      }
      if (node.next != null) {
        node.next.prev = node.prev;
      }
    } else if (this.head == this.tail) {
      this.head = this.tail = null;
    } else {
      this.tail = this.tail.prev;
    }
    size--;
  }
}

module.exports = {LinkedList};
