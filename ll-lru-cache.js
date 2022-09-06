const assert = require('assert');
const {LinkedList, Node} = require('./linked-list');

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
    if (!this.#cache.has(key)) {
      return;
    }
    const data = this.#cache.get(key);
    const { value } = data;
    // already the latest used
    if (data.lruNode === this.#lru.last()) {
      return value;
    }
    this.#lru.remove(data.lruNode);
    data.lruNode = this.#lru.append(key);;
    return value;
  }

  /**
   *
   * @param {number} key
   * @param {number} value
   * @returns {void}
   */
  put(key, value) {
    const isAtCapacity = this.#capacity > 0 && this.#cache.size === this.#capacity;
    if (isAtCapacity) {
      const least = this.#lru.first();
      this.#cache.delete(least.data);
    }
    const lruNode = this.#lru.append(key);
    this.#cache.set(key, new LRUCacheData(value, lruNode));
    return;
  }
}

module.exports = LRUCache
