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
        Handlebars.registerHelper('$livereload', this.render.bind(this));
    };

    AndHelper.prototype.render = function (port, options) {
        if (arguments.length < 1) {
            throw new Error('Unable to parse helper');
        }

        if(LoDash.isObject(port) && !LoDash.isArray(options)){
            options = port;
            port = 1337;
        }

    };

    module.exports = AndHelper;

}());
