/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, it, xit, expect, beforeEach, afterEach, afterLast, Class */
(function () {

    'use strict';

    var helper,
        cwd = process.cwd(),
        options = require('./../../fixtures/options'),
        Helper = require(cwd + '/tasks/lib/helpers/random');

    describe('Random helper', function () {

        beforeEach(function () {
            helper = new Helper();
            helper.register();

        });

        describe('render with no arguments', function () {
            it('Should throw with no arguments', function () {
                expect(function () {
                    helper.render();
                }).toThrow();
            });
            it('Should throw null arguments', function () {
                expect(function () {
                    helper.render(null);
                }).toThrow();
            });
            it('Should throw undefined arguments', function () {
                expect(function () {
                    helper.render(undefined);
                }).toThrow();
            });
        });

        describe('render with no args but options', function () {
            it('Should be 0 or 1 and not floating (false)', function () {
                var result = helper.render(options);
                expect(result).toEqual(jasmine.any(Number));
                expect(result).toBeLessThan(2);
                expect(result).toBeGreaterThan(-1);
                expect(result.toString()).not.toContain('.');
            });

        });

        describe('render with two args', function () {
            it('Should be 0 or 1 and floating', function () {
                var result = helper.render(true, options);
                expect(result).toEqual(jasmine.any(Number));
                expect(result).toBeLessThan(2);
                expect(result).toBeGreaterThan(-1);
                expect('' + result).toContain('.');
            });
            it('Should be 0 or 10', function () {
                var result = helper.render(10, options);
                expect(result).toEqual(jasmine.any(Number));
                expect(result).toBeLessThan(11);
                expect(result).toBeGreaterThan(-1);
            });
            it('Should throw', function () {
                expect(function () {
                    helper.render('10', options);
                }).toThrow();
            });
            it('Should throw', function () {
                expect(function () {
                    helper.render('toto', options);
                }).toThrow();
            });
        });

        describe('render with three args', function () {
            it('Should be 0 <> 10', function () {
                var result = helper.render(10, true, options);
                expect(result).toEqual(jasmine.any(Number));
                expect(result).toBeLessThan(11);
                expect(result).toBeGreaterThan(-1);
                expect('' + result).toContain('.');
            });
            it('Should be 0 <> 10', function () {
                var result = helper.render(10, false, options);
                expect(result).toEqual(jasmine.any(Number));
                expect(result).toBeLessThan(11);
                expect(result).toBeGreaterThan(-1);
            });
            it('Should be 10 <> 20', function () {
                var result = helper.render(10, 20, options);
                expect(result).toEqual(jasmine.any(Number));
                expect(result).toBeLessThan(21);
                expect(result).toBeGreaterThan(9);
            });
            it('Should throw', function () {
                expect(function () {
                    helper.render(10, '10', options);
                }).toThrow();
            });
            it('Should throw', function () {
                expect(function () {
                    helper.render(10, 'toto', {});
                }).toThrow();
            });
        });

        describe('render with three args', function () {
            it('Should be 30 <> 40 floating', function () {
                var result = helper.render(30, 40, true, options);
                expect(result).toEqual(jasmine.any(Number));
                expect(result).toBeLessThan(40);
                expect(result).toBeGreaterThan(30);
                expect('' + result).toContain('.');
            });
        });

    });

}());
