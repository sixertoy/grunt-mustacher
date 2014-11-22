/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, it, xit, expect, beforeEach, afterEach, afterLast, Class */
(function () {

    'use strict';

    var result, helper,
        cwd = process.cwd(),
        options = require(cwd + '/tests/fixtures/options'),
        Helper = require(cwd + '/tasks/lib/helpers/conditions');

    describe('Connditions helper', function () {

        beforeEach(function () {
            helper = new Helper();
            helper.register();
        });

        if ('should throw', function () {
            expect(function () {
                result = helper.render();
            }).toThrow();
            expect(function () {
                result = helper.render(options);
            }).toThrow();
            expect(function () {
                result = helper.render(true, options);
            }).toThrow();
        });

        describe('or', function () {
            if ('should not throw', function () {
                expect(function () {
                    result = helper.render(true, true, options);
                }).toEqual(true);
                expect(function () {
                    result = helper.render(true, false, options);
                }).toEqual(true);
                expect(function () {
                    result = helper.render(true, 1, options);
                }).toEqual(true);
                expect(function () {
                    result = helper.render(true, 0, options);
                }).toEqual(true);
                expect(function () {
                    result = helper.render(true, 'string', options);
                }).toEqual(true);
                expect(function () {
                    result = helper.render(false, 'string', options);
                }).toEqual(true);
            });
        });

        describe('and', function () {

        });

        afterEach(function () {
            helper = null;
        });

    });

}());
