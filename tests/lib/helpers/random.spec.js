/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, it, xit, expect, beforeEach, afterEach, afterLast, Class */
(function () {

    'use strict';

    var cwd = process.cwd(),
        Helper = require(cwd + '/tasks/lib/helpers/random');

    describe('Random helper', function () {

        var helper,
            options = {
                fn: function () {
                    return true;
                },
                inverse: function () {
                    return false;
                }
            };

        beforeEach(function () {
            helper = new Helper();
        });

        describe('render with no arguments', function () {
            it('Should throw with no arguments', function () {
                expect(function(){
                    helper.render();
                }).toThrow('Random helper arguments is missing');
            });
            it('Should throw null arguments', function () {
                expect(function(){
                    helper.render(null);
                }).toThrow('Random helper arguments is missing');
            });
            it('Should throw undefined arguments', function () {
                expect(function(){
                    helper.render(undefined);
                }).toThrow();
            });
        });

        describe('render with no args but options', function () {
            it('Should be 0 or 1 and not floating (false)', function () {
                var result = helper.render({});
                expect(result).toEqual(jasmine.any(Number));
                expect(result).toBeLessThan(2);
                expect(result).toBeGreaterThan(-1);
                expect(result.toString()).not.toContain('.');
            });

        });

        describe('render with two args', function () {
            it('Should be 0 or 1 and floating', function () {
                var result = helper.render(true, {});
                expect(result).toEqual(jasmine.any(Number));
                expect(result).toBeLessThan(2);
                expect(result).toBeGreaterThan(-1);
            });
            it('Should be 0 or 10', function () {
                var result = helper.render(10, {});
                expect(result).toEqual(jasmine.any(Number));
                expect(result).toBeLessThan(11);
                expect(result).toBeGreaterThan(-1);
            });
            it('Should throw', function () {
                expect(function(){
                    helper.render('10', {});
                }).toThrow();
            });
            it('Should throw', function () {
                expect(function(){
                    helper.render('toto', {});
                }).toThrow();
            });
        });

        describe('render with three args', function () {
            it('Should be 0 <> 10', function () {
                var result = helper.render(10, true, {});
                expect(result).toEqual(jasmine.any(Number));
                expect(result).toBeLessThan(11);
                expect(result).toBeGreaterThan(-1);
            });
            it('Should be 0 <> 10', function () {
                var result = helper.render(10, false, {});
                expect(result).toEqual(jasmine.any(Number));
                expect(result).toBeLessThan(11);
                expect(result).toBeGreaterThan(-1);
            });
            it('Should be 10 <> 20', function () {
                var result = helper.render(10, 20, {});
                expect(result).toEqual(jasmine.any(Number));
                expect(result).toBeLessThan(21);
                expect(result).toBeGreaterThan(9);
            });
            it('Should throw', function () {
                expect(function(){
                    helper.render(10, '10', {});
                }).toThrow();
            });
            it('Should throw', function () {
                expect(function(){
                    helper.render(10, 'toto', {});
                }).toThrow();
            });
        });

    });

}());
