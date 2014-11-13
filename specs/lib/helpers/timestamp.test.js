/*global process, require, define, describe, it, xit, expect, beforeEach, afterEach, afterLast, Class */
(function () {

    'use strict';

    var cwd = process.cwd(),
        Helper = require(cwd + '/tasks/lib/helpers/timestamp');

    describe('Timestamp helper', function () {

        var helper;

        beforeEach(function () {
            helper = new Helper();
        });

        describe('compile', function () {

            it('should not toEqual sup to now', function (done) {
                var now = Date.now();
                setTimeout(function () {
                    var result = helper.compile();
                    expect(now).not.toEqual(result);
                    done();
                }, 1000);
            });

            it('should not toBeGreaterThan sup to now', function (done) {
                var now = Date.now();
                setTimeout(function () {
                    var result = helper.compile();
                    expect(now).not.toBeGreaterThan(result);
                    done();
                }, 1000);
            });

            it('should toBeGreaterThan to now', function (done) {
                var result = helper.compile();
                setTimeout(function () {
                    var now = Date.now();
                    expect(now).toBeGreaterThan(result);
                    done();
                }, 1000);
            });

        });

    });

}());
