const assert = require('assert');
const {LinkedList, Node} = require('./linked-list/linked-list');

class LRUCacheData {
  /**
   * @type {number}
   */
  value;
  /**
   * @type {Node}
   */
  lruNode;

  /**
   *
   * @param {number} value
   * @param {Node} lruNode
   */
  constructor(value, lruNode) {
    this.value = value;
    this.lruNode = lruNode;
  }
}

class LRUCache {
  #capacity = 0;
  /**
   * @type {Map<number, LRUCacheData>}
   */
  #cache = new Map();
  /**
   * @type {LinkedList}
   */
  #lru = null;

  /**
   *
   * @param {number} capacity
   */
  constructor(capacity) {
    assert(typeof capacity === 'number', 'capacity should be a number');
    assert(capacity > 0, 'capacity should be greater than zero');
    this.#capacity = capacity
    this.#cache = new Map();
    this.#lru = new LinkedList(capacity);
  }

  /**
   *
   * @param {number} key
   * @returns {number|undefined}
   */
  get(key) {
    const data = this.#cache.get(key);
    if (typeof data === 'undefined') {
      return -1;
    }
    if (data.lruNode === this.#lru.last()) {
      return data.value;
    }
    // TODO: make reassignment rather than remove/append
    this.#lru.moveToTail(data.lruNode);
    // this.#lru.remove(data.lruNode);
    // data.lruNode = this.#lru.append(key);;
    return data.value;
  }

  /**
   *
   * @param {number} key
   * @param {number} value
   * @returns {void}
   */
  put(key, value) {
    const data = this.#cache.get(key);
    if (typeof data !== 'undefined') {
      data.value = value;
      this.#lru.moveToTail(data.lruNode);
      return;
    }
    const isAtCapacity = this.#capacity > 0 && this.#cache.size === this.#capacity;
    if (isAtCapacity) {
      const least = this.#lru.first();
      this.#cache.delete(least.data);
      this.#lru.remove(least);
    }
    const lruNode = this.#lru.append(key);
    this.#cache.set(key, new LRUCacheData(value, lruNode));
    return;
  }
}

module.exports = LRUCache
