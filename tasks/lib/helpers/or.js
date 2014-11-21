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

    var OrHelper,
        LoDash = require('lodash'),
        Utils = require('../task-utils'),
        Handlebars = require('handlebars');

    OrHelper = function () {};

    OrHelper.prototype.register = function () {
        Handlebars.registerHelper('or', this.render.bind(this));
    };

    OrHelper.prototype.render = function (lvalue, rvalue, options) {

        if (!Utils.containsOptions(arguments) || arguments.length < 3) {
            throw new Error('OrHelper arguments is missing');
        }

        var result, data;
        options = arguments[arguments.length - 1];
        if (options.data) {
            data = Handlebars.createFrame(options.data || {});
        }

        result = LoDash.compat(arguments.slice(-1));
        if (result.length > 0) {
            return options.fn(arguments.slice(-1), {
                data: data
            });
        } else {
            return options.inverse(arguments.slice(-1), {
                data: data
            });
        }

    };

    module.exports = OrHelper;

}());
