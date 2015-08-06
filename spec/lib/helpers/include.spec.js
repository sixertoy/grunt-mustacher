/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, Class */
(function () {

    'use strict';

    var helper,
        cwd = process.cwd(),
        Handlebars = require('handlebars'),
        options = require('./../../fixtures/options'),
        Helper = require(cwd + '/tasks/lib/helpers/include');

    describe('Include helper', function () {

        beforeEach(function () {
            helper = new Helper();
            helper.register();
        });

        describe('render with no arguments', function () {
            it('should throw', function () {
                expect(function () {
                    helper.render();
                }).toThrow();
                expect(function () {
                    helper.render(options);
                }).toThrow();
            });
        });
        describe('render with two arguments', function () {
            it('no file should throw', function () {
                expect(function () {
                    helper.render([], options);
                }).toThrow();
                expect(function () {
                    helper.render(12, options);
                }).toThrow();
                expect(function () {
                    helper.render({}, options);
                }).toThrow();
                expect(function () {
                    helper.render(null, options);
                }).toThrow();
                expect(function () {
                    helper.render(undefined, options);
                }).toThrow();
            });
            it('should not throw', function () {
                expect(function () {
                    helper.render('namespace/to/include', options);
                }).not.toThrow();
                expect(function () {
                    helper.render('namespace/to/include12', options);
                }).not.toThrow();
            });
        });

        describe('render with two arguments', function () {
            it('no options object should throw', function () {
                expect(function () {
                    helper.render('namespace/to/include', []);
                }).toThrow();
                expect(function () {
                    helper.render('namespace/to/include', 12);
                }).toThrow();
                expect(function () {
                    helper.render('namespace/to/include', 'string');
                }).toThrow();
                expect(function () {
                    helper.render('namespace/to/include', {});
                }).toThrow();
                expect(function () {
                    helper.render('namespace/to/include', null);
                }).toThrow();
            });
            it('should not throw with an handlebars options object', function () {
                expect(function () {
                    helper.render('namespace/to/include', options);
                }).not.toThrow();
            });
        });

        describe('include a template', function () {
            xit('should be equal', function () {
                var html = '{{$include "fixtures/include"}}',
                    template = Handlebars.compile(html);
                expect(template({}, options)).toEqual('<span>I am a template included</span>');
            });
        });


        afterEach(function () {
            helper = null;
        });

    });

}());
