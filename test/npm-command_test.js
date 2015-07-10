'use strict';

var fs = require('fs');

var testExistence = function (test, expectations) {
  test.expect(expectations.length);

  expectations.forEach(function (expectation) {
    test.equal(fs.existsSync(expectation), true, expectation + ' should exist');
  });

  test.done();
};

exports.command = {
  'default': function (test) {
    testExistence(test, [
      'test/fixtures/underscore/node_modules/underscore',
      'test/fixtures/underscore/node_modules/debug'
    ]);
  },
  'custom': function (test) {
    testExistence(test, [
      'test/fixtures/lodash/node_modules/lodash'
    ]);
  },
  'error': function (test) {
    testExistence(test, [
      'test/fixtures/error/npm-debug.log'
    ]);
  }
};
