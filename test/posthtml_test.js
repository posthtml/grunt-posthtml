'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.posthtml = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  build: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/tmp/index.html');
    var expected = grunt.file.read('test/expected/index.html');

    test.equal(actual, expected, 'The doctype should be changed to HTML5');

    test.done();
  },
  head: function(test) {

    test.expect(1);

    var actual = grunt.file.read('test/tmp/test-head-elements.html');
    var expected = grunt.file.read('test/expected/test-head-elements.html');

    test.equal(actual, expected, 'HTML head elements should be inserted from the head.json file');

    test.done();
  },
  include: function(test) {

    test.expect(1);

    var actual = grunt.file.read('test/tmp/posthtml-include.html');
    var expected = grunt.file.read('test/expected/posthtml-include.html');

    test.equal(actual, expected, 'Uses the posthtml-include plugin to inject the button HTML file into the body');

    test.done();
  }
  /*  single: function(test) {

   test.expect(1);

   var actual = grunt.file.read('test/tmp/single.html');
   var expected = grunt.file.read('test/expected/single.html');

   test.equal(actual, expected, 'Checks to make sure that static mapping works correctly');

   test.done();
   }*/
};
