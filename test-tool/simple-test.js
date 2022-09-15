let level = 0;
function describe(suite='', run=()=>{}) {
  let localLevel = level;
  level++;
  info(localLevel, suite);
  try {
    run();
  } catch (e) {
    error(localLevel, `Failed Suite ${suite} execution. Error=${e.name} Message=${e.message}`)
  } finally {
    level--;
  }
}

function test(testCase='', run=()=>{}) {
  try {
    run();
    info(level, `PASS it does ${testCase}`);
  } catch(e) {
    error(level, `FAIL it doesn't ${testCase}: ${e.toString()}`);
  }
}

function info(level=0, message='') {
  const ident = level > 0 ? '\t'.repeat(level) : '';
  console.info(`${ident}${message}`);
}

function error(level=0, message='') {
  const ident = level > 0 ? '\t'.repeat(level) : '';
  console.error(`${ident}${message}`);
}

module.exports = {describe, test};
