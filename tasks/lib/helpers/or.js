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
        Handlebars = require('handlebars');

    OrHelper = function () {};

    OrHelper.prototype.register = function () {
        Handlebars.registerHelper('equal', this.render.bind(this));
    };

    OrHelper.prototype.render = function (lvalue, rvalue, options) {
        if (arguments.length < 3) {
            throw new Error('Or helper needs two parameters at least');
        }

        var data, context = {};
        if (options.data) {
            data = Handlebars.createFrame(options.data || {});
        }
        if (lvalue !== rvalue) {
            return options.inverse(context, { data: data });
        } else {
            return options.fn(context, { data: data });
        }

    };

    module.exports = OrHelper;

}());
