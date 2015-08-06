/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, it, xit, expect, beforeEach, afterEach, afterLast, Class */
(function () {

    'use strict';

    var helper,
        cwd = process.cwd(),
        Grunt = require('grunt'),
        Handlebars = require('handlebars'),
        options = require('./../../fixtures/options'),
        Helper = require(cwd + '/tasks/lib/helpers/repeat');


    describe('Repeat helper', function () {

        var lf = Grunt.util.linefeed;

        beforeEach(function () {
            helper = new Helper();
            helper.register();
        });

        describe('render', function () {

            it('Should toThrow with no arguments', function () {
                expect(function () {
                    helper.render();
                }).toThrow();
            });

            it('Should toThrow with one argument', function () {
                expect(function () {
                    helper.render({});
                }).toThrow();
            });

            it('Should toThrow with a word argument', function () {
                expect(function () {
                    helper.render('word', options);
                }).toThrow();
            });

            it('Should toThrow with a blank spaced string argument', function () {
                expect(function () {
                    helper.render(' ', options);
                }).toThrow();
            });

            it('Should toThrow with a empty string argument', function () {
                expect(function () {
                    helper.render('', options);
                }).toThrow();
            });

            it('Should toThrow with a second argument in not a handlebars context', function () {
                expect(function () {
                    helper.render(4, 4);
                }).toThrow();
            });

        });

        describe('render html string', function () {

            it('Should be equal', function () {
                var html = '{{#repeat 4}}<span>item</span>{{/repeat}}',
                    template = Handlebars.compile(html);
                expect(template()).toEqual('<span>item</span><span>item</span><span>item</span><span>item</span>');
            });

            it('Should be equal with index', function () {
                var html = '{{#repeat 4}}<span>item {{@index}}</span>{{/repeat}}',
                    template = Handlebars.compile(html);
                expect(template()).toEqual('<span>item 0</span><span>item 1</span><span>item 2</span><span>item 3</span>');
            });

            it('Should be equal with index and first', function () {
                var html = '{{#repeat 4}}<span>item {{@index}} {{@first}}</span>{{/repeat}}',
                    template = Handlebars.compile(html),
                    result = template();
                expect(result).toEqual('<span>item 0 true</span><span>item 1 false</span><span>item 2 false</span><span>item 3 false</span>');
            });

            it('Should be equal with index and last', function () {
                var html = '{{#repeat 4}}<span>item {{@index}} {{@last}}</span>{{/repeat}}',
                    template = Handlebars.compile(html),
                    result = template();
                expect(result).toEqual('<span>item 0 false</span><span>item 1 false</span><span>item 2 false</span><span>item 3 true</span>');
            });

            it('Should be equal with index and even', function () {
                var html = '{{#repeat 4}}<span>item {{@index}} {{@even}}</span>{{/repeat}}',
                    template = Handlebars.compile(html);
                expect(template()).toEqual('<span>item 0 false</span><span>item 1 true</span><span>item 2 false</span><span>item 3 true</span>');
            });

            it('Should be equal with index and odd', function () {
                var html = '{{#repeat 4}}<span>item {{@index}} {{@odd}}</span>{{/repeat}}',
                    template = Handlebars.compile(html);
                expect(template()).toEqual('<span>item 0 true</span><span>item 1 false</span><span>item 2 true</span><span>item 3 false</span>');
            });

            it('Should be equal with count and of', function () {
                var html = '{{#repeat 4}}<span>item {{count}} of {{of}}</span>{{/repeat}}',
                    template = Handlebars.compile(html);
                expect(template()).toEqual('<span>item 1 of 4</span><span>item 2 of 4</span><span>item 3 of 4</span><span>item 4 of 4</span>');
            });

        });

        describe('render html template', function () {

            it('Should be equal to expected content', function (done) {
                var expected = Grunt.file.read(cwd + '/spec/expected/repeat'),
                    fixtures = Grunt.file.read(cwd + '/spec/fixtures/repeat');
                setTimeout(function () {
                    var template = Handlebars.compile(fixtures);
                    expect(template()).toEqual(expected);
                    done();
                }, 2000);
            });

        });

        describe('render html template nested', function () {

            it('Should be equal to expected content', function (done) {
                var expected = Grunt.file.read(cwd + '/spec/expected/repeat-nested'),
                    fixtures = Grunt.file.read(cwd + '/spec/fixtures/repeat-nested');
                setTimeout(function () {
                    var template = Handlebars.compile(fixtures);
                    expect(template()).toEqual(expected);
                    done();
                }, 2000);
            });

        });

        describe('render html template nested if', function () {

            it('Should be equal to expected content', function (done) {
                var expected = Grunt.file.read(cwd + '/spec/expected/repeat-nested-if'),
                    fixtures = Grunt.file.read(cwd + '/spec/fixtures/repeat-nested-if');
                setTimeout(function () {
                    var template = Handlebars.compile(fixtures);
                    expect(template()).toEqual(expected);
                    done();
                }, 2000);
            });

        });

    });

}());
