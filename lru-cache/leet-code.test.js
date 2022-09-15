const [ops, inputs] = require('./test-case.json');
const LRUCache = require('./ll-lru-cache');
// const ops = ["LRUCache","get","put","get","put","put","get","get"];
// const inputs = [[2],[2],[2,6],[1],[1,5],[1,2],[1],[2]];
let [ip] = inputs[0];
console.time('finished leet code test');
const lru = new LRUCache(ip);
for (let index = 1; index < ops.length; index++) {
    const op = ops[index];
    const ip = inputs[index];
    lru[op](ip[0], ip[1]);
}
console.timeEnd('finished leet code test');
