/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, it, xit, expect, beforeEach, afterEach, afterLast, Class */
(function () {

    'use strict';

    var helper, result,
        cwd = process.cwd(),
        Handlebars = require('handlebars'),
        options = require('./../../fixtures/options'),
        Helper = require(cwd + '/tasks/lib/helpers/image');

    describe('Image helper', function () {

        beforeEach(function () {
            helper = new Helper();
            helper.register();
        });

        describe('render', function () {
            expect(function () {
                helper.render();
            }).toThrow();
            expect(function () {
                helper.render(20);
            }).toThrow();
        });

        describe('compile', function () {

            it('should not throw', function () {
                expect(function () {
                    var template = Handlebars.compile('{{$image}}');
                    template();
                }).not.toThrow();
                expect(function () {
                    var template = Handlebars.compile('{{$image 400}}');
                    template();
                }).not.toThrow();
                expect(function () {
                    var template = Handlebars.compile('{{$image 400 600}}');
                    template();
                }).not.toThrow();
            });

            it('should be equal to', function () {
                var html = '{{$image}}',
                    template = Handlebars.compile(html);
                expect(template({}, options)).toEqual('<img src="http://placehold.it/300" alt="" title="" />');
            });

            it('should be equal to', function () {
                var html = '{{$image 500}}',
                    template = Handlebars.compile(html);
                expect(template({}, options)).toEqual('<img src="http://placehold.it/500" alt="" title="" />');
            });

            it('should be equal to', function () {
                var html = '{{$image 500 800}}',
                    template = Handlebars.compile(html);
                expect(template({}, options)).toEqual('<img src="http://placehold.it/500x800" alt="" title="" />');
            });

        });

        afterEach(function () {
            helper = null;
        });


    });

}());
