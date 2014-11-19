/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, it, xit, expect, beforeEach, afterEach, afterLast, Class */
(function () {

    'use strict';

    var cwd = process.cwd(),
        Helper = require(cwd + '/tasks/lib/helpers/equal');

    describe('Equal helper', function () {

        var helper,
            options = {
                fn: function(){return true;},
                inverse: function(){return false;}
            };

        beforeEach(function () {
            helper = new Helper();
        });

        describe('render', function () {

            it('Should be false (number)', function(){
                expect(helper.render(3, 4, options)).toBe(false);
            });

            it('Should be true (number)', function(){
                expect(helper.render(4, 4, options)).toBe(true);
            });

            it('Should be false (number)', function(){
                expect(helper.render(4, '4', options)).toBe(false);
            });

            it('Should be true string', function(){
                expect(helper.render('4', '4', options)).toBe(true);
            });

            it('Should be false string', function(){
                expect(helper.render('40', '4', options)).toBe(false);
            });

            it('Should be true string', function(){
                expect(helper.render('Lorem ipsum', 'Lorem ipsum', options)).toBe(true);
            });

            it('Should be false string', function(){
                expect(helper.render('Lorem ipsum', 'Lorem ipsum dolor', options)).toBe(false);
            });

            it('Should be false object', function(){
                expect(helper.render({}, {}, options)).toBe(false);
            });

            it('Should be false object', function(){
                expect(helper.render({fn:{}, inverse:{}}, {fn:{}, inverse:{}}, options)).toBe(false);
            });

            it('Should be false array', function(){
                expect(helper.render([], [], options)).toBe(false);
            });

            it('Should be false array', function(){
                expect(helper.render([1, 2, 3], [1, 2, 3], options)).toBe(false);
            });

            it('Should be false function', function(){
                expect(helper.render(function(){}, function(){}, options)).toBe(false);
            });

        });

    });

}());
