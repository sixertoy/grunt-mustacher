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

        describe('render', function () {});

        describe('compile', function () {});

        afterEach(function () {
            helper = null;
        });

    });

}());
