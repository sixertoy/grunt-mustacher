/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, it, xit, expect, beforeEach, afterEach, afterLast, Class */
(function () {

    'use strict';

    var helper,
        cwd = process.cwd(),
        Handlebars = require('handlebars'),
        options = require('./../../fixtures/options'),
        Helper = require(cwd + '/tasks/lib/helpers/literal');

    describe('Literal helper', function () {

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

        describe('render ldim', function () {
            it('Should be equal', function () {
                var html = '{{$ldim}}toto',
                    template = Handlebars.compile(html);
                expect(template({}, options)).toEqual('{{toto');
            });
        });

        describe('render rdim', function () {
            it('Should be equal', function () {
                var html = 'toto{{$rdim}}',
                    template = Handlebars.compile(html);
                expect(template({}, options)).toEqual('toto}}');
            });
        });

        describe('render lrdim & rdim', function () {
            it('Should be equal', function () {
                var html = '{{$ldim}}toto{{$rdim}}',
                    template = Handlebars.compile(html);
                expect(template({}, options)).toEqual('{{toto}}');
            });
        });

        describe('render raw', function () {
            it('Should be equal', function () {
                var html = '{{{{raw}}}}{{toto}}{{{{/raw}}}}',
                    template = Handlebars.compile(html);
                expect(template({}, options)).toEqual('{{toto}}');
                // handlebars
                html = '\\{{toto}}'; // \{{toto}} in templates
                template = Handlebars.compile(html);
                expect(template({}, options)).toEqual('{{toto}}');
            });
        });

    });

}());
