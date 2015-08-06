/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, it, xit, expect, beforeEach, afterEach, afterLast, Class */
(function () {

    'use strict';

    var result, html, template, helper,
        cwd = process.cwd(),
        Handlebars = require('handlebars'),
        options = require('./../../fixtures/options'),
        Helper = require(cwd + '/tasks/lib/helpers/conditions');

    // @see https://lodash.com/docs#compact
    describe('Conditions helper', function () {

        beforeEach(function () {
            helper = new Helper();
            helper.register();
        });

        if ('should throw', function () {
            expect(function () {
                result = helper.render();
            }).toThrow();
        });
        if ('should throw', function () {
            expect(function () {
                result = helper.render(options);
            }).toThrow();
        });
        if ('should throw', function () {
            expect(function () {
                result = helper.render(true, options);
            }).toThrow();
        });

        if ('should not throw', function () {
            expect(function () {
                result = helper.render(true, true, options);
            }).not.toThrow();
        });

        describe('or', function () {
            html = '{{#or true true}}or is exact{{else}}or is not exact{{/or}}';
            it('should be equal', function () {
                template = Handlebars.compile(html);
                expect(template()).toEqual('or is exact');
            });
            it('should be equal', function () {
                html = '{{#or true false}}or is exact{{else}}or is not exact{{/or}}';
                template = Handlebars.compile(html);
                expect(template()).toEqual('or is exact');
            });
            it('should not be equal', function () {
                html = '{{#or false false}}or is exact{{else}}or is not exact{{/or}}';
                template = Handlebars.compile(html);
                expect(template()).toEqual('or is not exact');
            });
        });

        describe('and', function () {
            it('should be equal', function () {
                html = '{{#and true true}}and is exact{{else}}and is not exact{{/and}}';
                template = Handlebars.compile(html);
                expect(template()).toEqual('and is exact');
            });
            it('should be equal', function () {
                html = '{{#and true true 1}}and is exact{{else}}and is not exact{{/and}}';
                template = Handlebars.compile(html);
                expect(template()).toEqual('and is exact');
            });
            it('should not be equal', function () {
                html = '{{#and true true 0}}and is exact{{else}}and is not exact{{/and}}';
                template = Handlebars.compile(html);
                expect(template()).toEqual('and is not exact');
            });
            it('should not be equal', function () {
                html = '{{#and true false}}and is exact{{else}}and is not exact{{/and}}';
                template = Handlebars.compile(html);
                expect(template()).toEqual('and is not exact');
            });
            it('should not be equal', function () {
                html = '{{#and false false true}}and is exact{{else}}and is not exact{{/and}}';
                template = Handlebars.compile(html);
                expect(template()).toEqual('and is not exact');
            });
        });

        afterEach(function () {
            html = '';
            helper = null;
        });

    });

}());
