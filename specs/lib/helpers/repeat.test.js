/*jslint plusplus: true, indent: 4 */
/*global jasmine, process, require, define, describe, it, xit, expect, beforeEach, afterEach, afterLast, Class */
(function () {

    'use strict';

    var cwd = process.cwd(),
        Grunt = require('grunt'),
        Handlebars = require('handlebars'),
        Helper = require(cwd + '/tasks/lib/helpers/repeat');


    describe('Repeat helper', function () {

        var helper,
            lf = Grunt.util.linefeed,
            options = {
                fn: function () {}
            };

        beforeEach(function () {
            helper = new Helper();
            helper.register();
        });

        describe('getCount', function () {

            it('Should be equal to null', function () {
                var result = helper.getCount();
                expect(result).toEqual(null);
            });

            it('Should be equal to 4', function () {
                helper.compile(4, options);
                var result = helper.getCount();
                expect(result).toEqual(4);
            });

            it('Should be a number', function () {
                helper.compile('4', options);
                var result = helper.getCount();
                expect(result).toEqual(jasmine.any(Number));
            });

            it('Should toEqual 10', function () {
                helper.compile(' 10 ', options);
                var result = helper.getCount();
                expect(result).toEqual(10);
            });


        });

        describe('compile', function () {

            it('Should toThrow with no arguments', function () {
                expect(function () {
                    helper.compile();
                }).toThrow(new Error('Repeat arguments is missing'));
            });

            it('Should toThrow with one argument', function () {
                expect(function () {
                    helper.compile({});
                }).toThrow(new Error('Repeat arguments is missing'));
            });

            it('Should toThrow with a word argument', function () {
                expect(function () {
                    helper.compile('word', options);
                }).toThrow(new Error('Repeat arguments is not valid'));
            });

            it('Should toThrow with a blank spaced string argument', function () {
                expect(function () {
                    helper.compile(' ', options);
                }).toThrow(new Error('Repeat arguments is not valid'));
            });

            it('Should toThrow with a empty string argument', function () {
                expect(function () {
                    helper.compile('', options);
                }).toThrow(new Error('Repeat arguments is not valid'));
            });

            it('Should toThrow with a second argument in not a handlebars context', function () {
                expect(function () {
                    helper.compile(4, 4);
                }).toThrow(new Error('Repeat arguments is not an handlebars context'));
            });

            it('Should be equal', function () {
                var html = '{{#repeat 4}}item{{/repeat}}',
                    template = Handlebars.compile(html);
                expect(template()).toEqual('item' + lf + 'item' + lf + 'item' + lf + 'item');
            });

            it('Should be equal with zindex', function () {
                var html = '{{#repeat 4}}item {{@zindex}}{{/repeat}}',
                    template = Handlebars.compile(html);
                expect(template()).toEqual('item 0' + lf + 'item 1' + lf + 'item 2' + lf + 'item 3');
            });

            it('Should be equal with zindex and first', function () {
                var html = '{{#repeat 4}}item {{@zindex}} {{@first}}{{/repeat}}',
                    template = Handlebars.compile(html),
                    result = template();
                expect(result).toEqual('item 0 true' + lf + 'item 1 false' + lf + 'item 2 false' + lf + 'item 3 false');
            });

            it('Should be equal with zindex and last', function () {
                var html = '{{#repeat 4}}item {{@zindex}} {{@last}}{{/repeat}}',
                    template = Handlebars.compile(html);
                expect(template()).toEqual('item 0 false' + lf + 'item 1 false' + lf + 'item 2 false' + lf + 'item 3 true');
            });

            it('Should be equal with zindex and even', function () {
                var html = '{{#repeat 4}}item {{@zindex}} {{@even}}{{/repeat}}',
                    template = Handlebars.compile(html);
                expect(template()).toEqual('item 0 false' + lf + 'item 1 true' + lf + 'item 2 false' + lf + 'item 3 true');
            });

            it('Should be equal with zindex and odd', function () {
                var html = '{{#repeat 4}}item {{@zindex}} {{@odd}}{{/repeat}}',
                    template = Handlebars.compile(html);
                expect(template()).toEqual('item 0 true' + lf + 'item 1 false' + lf + 'item 2 true' + lf + 'item 3 false');
            });

            it('Should be equal with zindex and of', function () {
                var html = '{{#repeat 4}}item {{@zindex}} of {{@of}}{{/repeat}}',
                    template = Handlebars.compile(html);
                expect(template()).toEqual('item 0 of 4' + lf + 'item 1 of 4' + lf + 'item 2 of 4' + lf + 'item 3 of 4');
            });

            it('Should be equal with index and of', function () {
                var html = '{{#repeat 4}}item {{@index}} of {{@of}}{{/repeat}}',
                    template = Handlebars.compile(html);
                expect(template()).toEqual('item 1 of 4' + lf + 'item 2 of 4' + lf + 'item 3 of 4' + lf + 'item 4 of 4');
            });

            it('Should be equal to expected content', function (done) {
                var content = Grunt.file.read(cwd + '/specs/expected/repeat');
                setTimeout(function () {
                    var html = '{{#repeat 4}}<span class="{{@class}}">Hello - {{@zindex}}</span>{{/repeat}}',
                        template = Handlebars.compile(html);
                    expect(template()).toEqual(content.trim());
                    done();
                }, 2000);
            });

        });

    });

}());
