/*global jasmine, process, require, define, describe, it, xit, expect, beforeEach, afterEach, afterLast, Class */
(function () {

    'use strict';

    var cwd = process.cwd(),
        Helper = require(cwd + '/tasks/lib/helpers/timestamp');

    describe('Timestamp helper', function () {

        var helper;

        beforeEach(function () {
            helper = new Helper();
        });

        describe('render', function () {

            it('Should not toEqual sup to now', function (done) {
                var now = Date.now();
                setTimeout(function () {
                    var result = helper.render({});
                    expect(now).not.toEqual(result);
                    done();
                }, 1000);
            });

            it('Should not toBeGreaterThan sup to now', function (done) {
                var now = Date.now();
                setTimeout(function () {
                    var result = helper.render({});
                    expect(now).not.toBeGreaterThan(result);
                    done();
                }, 1000);
            });

            it('Should toBeGreaterThan to now', function (done) {
                var result = helper.render({});
                setTimeout(function () {
                    var now = Date.now();
                    expect(now).toBeGreaterThan(result);
                    done();
                }, 1000);
            });

            it('Should be a number', function () {
                var result = helper.render({});
                expect(result).toEqual(jasmine.any(Number));
            });

        });

    });

}());
