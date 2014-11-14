/**
 * Grunt Mustacher
 * https://github.com/malas34/grunt-mustacher
 *
 * Copyright (c) 2014 Matthieu Lassalvy
 * Licensed under the MIT license.
 *
 * HANDLEBARS
 * @see http://handlebarsjs.com/
 *
 */
/*jslint plusplus: true, indent: 4 */
/*global module, require */
(function () {

    'use strict';

    var EqualHelper,
        Lodash = require('lodash'),
        Handlebars = require('handlebars');

    EqualHelper = function () {};

    EqualHelper.prototype.register = function () {
        var args,
            $this = this;
        Handlebars.registerHelper('equal', function () {
            args = Lodash.toArray(arguments);
            return $this.compile.apply($this, args);
        });
    };

    EqualHelper.prototype.compile = function (lvalue, rvalue, options) {
        var data;
        if (options.data) {
            data = Handlebars.createFrame(options.data || {});
        }
        if (arguments.length < 3) {
            throw new Error('Equal needs two parameters');
        }
        if (lvalue !== rvalue) {
            return options.inverse(this, { data: data });
        } else {
            return options.fn(this, { data: data });
        }
    };

    module.exports = EqualHelper;

}());
