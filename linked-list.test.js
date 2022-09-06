const assert = require('assert');
const {LinkedList} = require('./linked-list');
const test = require('./test');

test('instantiate LinkedList', () => {
  const ll = new LinkedList(0);
  assert(ll instanceof LinkedList, 'not an instanceof LinkedList');
});

test('append', () => {
  const ll = new LinkedList(1);
  const nd = ll.append(0);
  assert(nd != null, `failed to append`);
  const fd = ll.find(nd.data);
  assert(fd === nd, `failed to find node after append (check by ref)`);
  assert(fd.data === nd.data, `failed to find node after append (check by data)`);
});

test('iterate', () => {
  const ll = new LinkedList(6);
  const ar = [];
  ll.append(ar.push(ar.length) - 1);
  ll.append(ar.push(ar.length) - 1);
  ll.append(ar.push(ar.length) - 1);
  ll.append(ar.push(ar.length) - 1);
  ll.append(ar.push(ar.length) - 1);
  for (const i of ll) {
    const expected = ar.shift();
    // console.log(i.data, expected);
    assert(i.data === expected, `incorrect iterate order`);
  }
  const rest = [...ll];
  assert(Array.isArray(rest), `rest operator failed`);
});

test('find', () => {
  const ll = new LinkedList(4);
  const ar = [];
  ar.push(ll.append(0));
  ar.push(ll.append(1));
  ar.push(ll.append(2));
  ar.push(ll.append(3));
  for (const i of ar) {
    const f = ll.find(i.data);
    assert(f != null, `could not find node with data ${i.data}`);
  }
  const last = ll.append(4);
  const notFound = ll.find(0);
  assert(notFound == null, 'first appended should have been removed');
  const found = ll.find(4);
  assert(found === last, `find expected 4, found ${found} (check by ref)`);
  assert(found.data === last.data, `find expected 4, found ${found} (check by data)`);
});

test('remove', () => {
  const ll = new LinkedList(4);
  const ar = [];
  ar.push(ll.append(0));
  ar.push(ll.append(1));
  ar.push(ll.append(2));
  ar.push(ll.append(3));
  for (const it of ar) {
    assert(ll.remove(it), `failed to remove ${it.data}`);
    assert(ll.find(it.data) == null, 'still found data after being removed');
  }
});
