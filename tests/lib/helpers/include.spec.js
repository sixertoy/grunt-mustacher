/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, Class */
(function () {

    'use strict';

    var helper,
        cwd = process.cwd(),
        options = require(cwd + '/tests/fixtures/options'),
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
        xdescribe('render with two arguments', function () {
            it('no string file should throw', function () {
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

        xdescribe('render with two arguments', function () {
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

        xdescribe('render with grunt mustacher options (tpl dir)', function () {
            it('should not throw', function () {
                options.data = {};
                expect(function () {
                    helper.render('namespace/to/include', options);
                }).not.toThrow();
            });
        });


        afterEach(function () {
            helper = null;
        });

    });

}());
