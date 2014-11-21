/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, it, xit, expect, beforeEach, afterEach, afterLast, Class */
(function () {

    'use strict';

    var result, helper,
        cwd = process.cwd(),
        Utils = require(cwd + '/tasks/lib/task-utils'),
        args = require(cwd + '/tests/fixtures/arguments');

    describe('Taskutils', function () {

        beforeEach(function () {});

        it('contains options object', function () {
            expect(Utils.hasOptions()).toEqual(false);
            expect(Utils.hasOptions(args)).toEqual(true);
        });

        afterEach(function () {});

    });

}());
