const test = async (testCase, fn) => {
  try {
    const testRun = fn();
    if (testRun instanceof Promise) {
      await testRun;
    }
    console.info('PASS', `it does ${testCase}`);
  } catch(e) {
    console.error('FAIL', `it doesn't ${testCase}: ${e.toString()}`);
  }
}

module.exports = test;
