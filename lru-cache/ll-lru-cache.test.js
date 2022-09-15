const assert = require('assert');
const {describe, test} = require('../test-tool/simple-test');
const LRUCache = require('./ll-lru-cache');

describe('Linked List LRU Cache', () => {
  describe('constructor', () => {
    test('instantiate LRUCache', () => {
      const lru = new LRUCache(1);
      assert(lru instanceof LRUCache, 'not an instanceof LRUCache');
    });

    test('fail to instantiate LRUCache with capacity NaN', () => {
      try {
        new LRUCache();
        throw new Error('should have thrown AssertionError');
      } catch (error) {
        assert(error.message === 'capacity should be a number', 'not expected LRUCache capacity validation error');
      }
    });

    test('fail to instantiate LRUCache with capacity 0', () => {
      try {
        const lru = new LRUCache(0);
        throw new Error('should have thrown AssertionError');
      } catch (error) {
        assert(error.message === 'capacity should be greater than zero', 'not expected LRUCache capacity validation error');
      }
    });
  });

  describe('operations', () => {
    test('put a key', () => {
      const lru = new LRUCache(1);
      assert(lru.put(0, 0) === undefined, `failed to put`);
    });

    test('get a key', () => {
      const lru = new LRUCache(1);
      const value = 0;
      lru.put(0, value);
      assert(lru.get(0) === value, 'key not found in cache');
    });

    test('remove least used key', () => {
      const lru = new LRUCache(3);
      lru.put(0, 0);
      lru.put(1, 1);
      lru.put(2, 2);
      lru.put(3, 3);
      const not = lru.get(0);
      assert(not === -1, `least used entry was not removed`);
    });

    test('update key after use', () => {
      const lru = new LRUCache(3);
      lru.put(0, 0);
      lru.put(1, 1);
      lru.put(2, 2);
      lru.get(0);
      lru.put(3, 3);
      const there = lru.get(0);
      const not = lru.get(1);
      assert(there === 0, `recently used entry wan not updated`);
      assert(not === -1, `least used entry was not removed`);
    });
  });
});
