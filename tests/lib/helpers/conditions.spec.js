/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, it, xit, expect, beforeEach, afterEach, afterLast, Class */
(function () {

    'use strict';

    var result, html, template, helper,
        cwd = process.cwd(),
        Handlebars = require('handlebars'),
        options = require(cwd + '/tests/fixtures/options'),
        Helper = require(cwd + '/tasks/lib/helpers/conditions');

    describe('Conditions helper', function () {

        beforeEach(function () {
            helper = new Helper();
            helper.register();
        });

        if ('should throw', function () {
            expect(function () {
                result = helper.render();
            }).toThrow();
            expect(function () {
                result = helper.render(options);
            }).toThrow();
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
            xit('should be equal or', function(){
                html = '{{#or true true}}exact{{/or}}';
                template = Handlebars.compile(html);
                expect(template()).toEqual('or');
            })
        });

        describe('and', function () {});

        afterEach(function () {
            helper = null;
        });

    });

}());
