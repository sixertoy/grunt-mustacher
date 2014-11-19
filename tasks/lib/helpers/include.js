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
    var IncludeHelper,
        Lodash = require('lodash'),
        Handlebars = require('handlebars');

    IncludeHelper = function () {};

    IncludeHelper.prototype.register = function () {
        var args,
            $this = this;
        Handlebars.registerHelper('$include', this.render.bind(this));
    };

    IncludeHelper.prototype.render = function (path, context, options) {
        if (arguments.length < 2) {
            throw new Error('Include needs one parameters at least');
        }
        /*
        var data, context = {};
        if (options.data) {
            data = Handlebars.createFrame(options.data || {});
        }
        if (lvalue !== rvalue) {
            return options.inverse(context, { data: data });
        } else {
            return options.fn(context, { data: data });
        }
        */
    };

    module.exports = IncludeHelper;

}());
