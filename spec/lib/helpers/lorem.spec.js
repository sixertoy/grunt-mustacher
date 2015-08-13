/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, it, xit, expect, beforeEach, afterEach, afterLast, Class */
(function () {

    'use strict';

    var helper,
        cwd = process.cwd(),
        Handlebars = require('handlebars'),
        options = require('./../../fixtures/options'),
        Helper = require(cwd + '/tasks/lib/helpers/lorem');

    describe('Lorem helper', function () {

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
                    var template = Handlebars.compile('{{$lorem}}');
                    template();
                }).not.toThrow();
                expect(function () {
                    var template = Handlebars.compile('{{$lorem W}}');
                    template();
                expect(function () {
                    var template = Handlebars.compile('{{$lorem S}}');
                    template();
                expect(function () {
                    var template = Handlebars.compile('{{$lorem P}}');
                    template();
                }).not.toThrow();
                expect(function () {
                    var template = Handlebars.compile('{{$lorem W 10}}');
                    template();
                }).not.toThrow();
                expect(function () {
                    var template = Handlebars.compile('{{$lorem S 10}}');
                    template();
                }).not.toThrow();
                expect(function () {
                    var template = Handlebars.compile('{{$lorem P 10}}');
                    template();
                }).not.toThrow();
            });

            xit('should be true', function () {
                expect(function () {
                    var template = Handlebars.compile('{{$lorem}}');
                    expect(template());
                }).not.toThrow();
            });

        });

        afterEach(function () {
            helper = null;
        });

    });

}());
