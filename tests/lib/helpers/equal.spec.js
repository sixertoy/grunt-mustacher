/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, it, xit, expect, beforeEach, afterEach, afterLast, Class */
(function () {

    'use strict';

    var helper,
        cwd = process.cwd(),
        Helper = require(cwd + '/tasks/lib/helpers/equal'),
        options = require(cwd + '/tests/fixtures/options');

    describe('Equal helper', function () {

        beforeEach(function () {
            helper = new Helper();
            helper.register();
        });

        describe('render', function () {

            it('should throw', function(){
                expect(function(){
                    helper.render();
                }).toThrow();
                expect(function(){
                    helper.render(options);
                }).toThrow();
                expect(function(){
                    helper.render(true, options);
                }).toThrow();
                expect(function(){
                    helper.render(true, true, {});
                }).toThrow();
            });

            it('should be false (number)', function(){
                expect(helper.render(3, 4, options)).toBe(false);
            });

            it('should be true (number)', function(){
                expect(helper.render(4, 4, options)).toBe(true);
            });

            it('should be false (number)', function(){
                expect(helper.render(4, '4', options)).toBe(false);
            });

            it('should be true string', function(){
                expect(helper.render('4', '4', options)).toBe(true);
            });

            it('should be false string', function(){
                expect(helper.render('40', '4', options)).toBe(false);
            });

            it('should be true string', function(){
                expect(helper.render('Lorem ipsum', 'Lorem ipsum', options)).toBe(true);
            });

            it('should be false string', function(){
                expect(helper.render('Lorem ipsum', 'Lorem ipsum dolor', options)).toBe(false);
            });

            it('should be true object', function(){
                expect(helper.render({}, {}, options)).toBe(true);
            });

            it('should be true object', function(){
                expect(helper.render({'toto':'yo'}, {'toto':'yo'}, options)).toBe(true);
            });

            it('should be false object', function(){
                expect(helper.render({'toto':'yo'}, {'toto':'ya'}, options)).toBe(false);
            });

            it('should be false object', function(){
                expect(helper.render({'toto':'yo'}, {'toti':'yo'}, options)).toBe(false);
            });

            it('should be true array', function(){
                expect(helper.render([], [], options)).toBe(true);
            });

            it('should be true array', function(){
                expect(helper.render([1, 2, 3], [1, 2, 3], options)).toBe(true);
            });

            it('should be false array', function(){
                expect(helper.render([{'toto':'yo'}], [{'toti':'yo'}], options)).toBe(false);
            });

            it('should be false function', function(){
                expect(helper.render(function(){}, function(){}, options)).toBe(false);
            });

        });

        afterEach(function () {
            helper = null;
        });

    });

}());
