class LRUCacheData {
  /**
   * @type {number}
   */
  value;
  /**
   * @type {number}
   */
  lruIndex;

  /**
   *
   * @param {number} value
   * @param {number} lruIndex
   */
  constructor(value, lruIndex) {
    this.value = value;
    this.lruIndex = lruIndex;
  }
}

class LRUCache {
  #capacity = 0;
  /**
   * @type {Map<number, LRUCacheData>}
   */
  #cache = new Map();
  /**
   * @type {Array<number>}
   */
  #lru = []; // TODO: Make it an Linked List

  /**
   *
   * @param {number} capacity
   */
  constructor(capacity) {
    this.#capacity = capacity
    this.#cache = new Map();
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
    const { value, lruIndex } = data;
    // already the least
    if (lruIndex + 1 === this.#lru.length) {
      return value;
    }
    // hopeless attempt to keep array tidy
    if (lruIndex === 0) {
      this.#lru.shift();
    } else {
      delete this.#lru[lruIndex];
    }
    data.lruIndex = this.#lru.push(key);
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
      let deleteKey;
      do {
        deleteKey = this.#lru.shift();
      } while(deleteKey === undefined);
      this.#cache.delete(deleteKey);
    }
    const i = this.#lru.push(key) - 1;
    this.#cache.set(key, new LRUCacheData(value, i));
    return;
  }
}

module.exports = LRUCache
