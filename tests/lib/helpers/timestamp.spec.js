/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, it, xit, expect, beforeEach, afterEach, afterLast, Class */
(function () {

    'use strict';

    var helper, result,
        cwd = process.cwd(),
        Handlebars = require('handlebars'),
        options = require(cwd + '/tests/fixtures/options'),
        Helper = require(cwd + '/tasks/lib/helpers/timestamp');

    describe('Timestamp helper', function () {

        beforeEach(function () {
            helper = new Helper();
            helper.register();
        });

        it('should throw', function () {
            expect(function () {
                helper.render();
            }).toThrow();
            expect(function () {
                helper.render(20);
            }).toThrow();
        });

        it('should not throw', function () {
            expect(function () {
                var template = Handlebars.compile('{{$timestamp}}');
                template();
            }).not.toThrow();
            expect(function () {
                var template = Handlebars.compile('{{$timestamp 20}}');
                template();
            }).not.toThrow();
        });

        it('should not to be equal to now', function (done) {
            var now = Date.now();
            setTimeout(function () {
                var template = Handlebars.compile('{{$timestamp}}');
                expect(template()).not.toEqual(result);
                done();
            }, 1000);
        });

        /*
        it('should not to be equal to now', function (done) {
            var now = Date.now();
            setTimeout(function () {
                var result = helper.render({});
                expect(now).not.toEqual(result);
                done();
            }, 1000);
        });

        it('should not to be greater than now', function (done) {
            var now = Date.now();
            setTimeout(function () {
                var result = helper.render({});
                expect(now).not.toBeGreaterThan(result);
                done();
            }, 1000);
        });

        it('should to be greater than now', function (done) {
            var now,
                stamp = 400,
                result = helper.render({});
            setTimeout(function () {
                now = Date.now();
                expect(now).toBeGreaterThan(result);
            }, stamp);
        });

        it('should be a number', function () {
            var result = helper.render({});
            expect(result).toEqual(jasmine.any(Number));
            var result = helper.render(20, {});
            expect(result).toEqual(jasmine.any(Number));
        });
        */

        afterEach(function () {
            helper = null;
        });


    });

}());
