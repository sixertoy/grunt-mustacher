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
        Handlebars.registerHelper('$equal', function () {
            args = Lodash.toArray(arguments);
            return $this.compile.apply($this, args);
        });
    };

        EqualHelper.prototype.compile = function (options) {
        var context = options || {};
        return (!Date.now) ? new Date().getTime() : Date.now();
    };

    module.exports = EqualHelper;

}());
