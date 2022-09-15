const assert = require('assert');
const {describe, test} = require('../test-tool/simple-test');

describe('List', () => {
  describe('Module', () => {
    test('import module', () => {
      const list = require('./cormen-list');
      assert(list != null, 'failed to require list');
    });
  });
});
