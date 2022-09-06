const LRUCache = require('./lru-cache');
const assert = require('assert');
const test = require('./test');

test('instantiate LRUCache', () => {
  const lru = new LRUCache(0);
  assert(lru instanceof LRUCache, 'not an instanceof LRUCache');
});

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
  assert(not === undefined, `least used entry was not removed`);
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
  assert(not === undefined, `least used entry was not removed`);
});
