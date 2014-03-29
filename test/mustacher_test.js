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
/*
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default_options');
    var expected = grunt.file.read('test/expected/default_options');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },
  custom_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/custom_options');
    var expected = grunt.file.read('test/expected/custom_options');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  },
*/

exports.mustacher = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    single_files: function (test) {
        // files{ 'fichier.html':'fichier.mustache'}
        // Pas de JSON
        test.expect();
        var actual = grunt.file.read('tmp/index.html');
        var expected = grunt.file.read('test/expected/index.html');
        test.equal(actual, expected, 'HTML has been parsed by mustache/handlebars and equal fail.');
        test.done();
    },
    single_files_autocontext: function (test) {
        // files{ 'fichier.html':'fichier.mustache'}
        // Recuperation du JSON si existant
        test.expect();
        var actual = grunt.file.read('tmp/autocontext.html');
        var expected = grunt.file.read('test/expected/autocontext.html');
        test.equal(actual, expected, 'HTML has been parsed by mustache/handlebars and equal fail.');
        test.done();
    },
    single_files_context: function (test) {
        // files{ src:'fichier.html',dest:'fichier.mustache',context:'fichier.json'}
        // JSON dans la config 'context'
        test.expect();
        var actual = grunt.file.read('tmp/context.html');
        var expected = grunt.file.read('test/expected/context.html');
        test.equal(actual, expected, 'HTML has been parsed by mustache/handlebars and equal fail.');
        test.done();
    },
};
