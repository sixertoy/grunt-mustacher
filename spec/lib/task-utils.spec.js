/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, it, xit, expect, beforeEach, afterEach, afterLast, Class */
(function () {

    'use strict';

    var result, helper,
        cwd = process.cwd(),
        Utils = require(cwd + '/tasks/lib/task-utils'),
        args = require(cwd + '/tests/fixtures/arguments'),
        array = require(cwd + '/tests/fixtures/arguments_array');

    describe('Taskutils', function () {

        beforeEach(function () {});

        describe('contains options object', function () {
            it('should be false', function () {
                expect(Utils.hasOptions()).toEqual(false);
            });
            it('should be true', function () {
                expect(Utils.hasOptions(args)).toEqual(array);
            });
        });

        afterEach(function () {});

    });

}());
