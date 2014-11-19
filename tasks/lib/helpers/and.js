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
/*jslint indent: 4 */
/*global module, require */
(function () {

    'use strict';

    var AndHelper,
        LoDash = require('lodash'),
        Handlebars = require('handlebars');

    AndHelper = function () {};

    AndHelper.prototype.register = function () {
        Handlebars.registerHelper('equal', this.render.bind(this));
    };

    AndHelper.prototype.render = function (lvalue, rvalue, options) {
        if (arguments.length < 3) {
            throw new Error('Equal needs two parameters');
        }

        var result, data;
        options = arguments[arguments.length - 1];
        if (options.data) {
            data = Handlebars.createFrame(options.data || {});
        }

        result = LoDash.compat(arguments.slice(-1));
        if (result.length === arguments.length) {
            return options.fn(arguments.slice(-1), {
                data: data
            });
        } else {
            return options.inverse(arguments.slice(-1), {
                data: data
            });
        }

    };

    module.exports = AndHelper;

}());
