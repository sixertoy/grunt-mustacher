/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {
    'use strict';
    var cwd = process.cwd(),
        path = require('path'),
        grunt = require('grunt'),
        expect = require('chai').expect,
        sinon = require('sinon'),
        read = function (src) {
            return grunt.util.normalizelf(grunt.file.read(src));
        };

    describe('grunt-mustacher', function () {

        it('load compact.html', function(){
            var actual = read('spec/tmp/compact.html').trim(),
                expected = read('spec/expected/compact.html').trim();
            expect(expected).to.deep.equal(actual);
        });

    });

}());
