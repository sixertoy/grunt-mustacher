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

    var TimestampHelper,
        Lodash = require('lodash'),
        Handlebars = require('handlebars');

    TimestampHelper = function () {};

    TimestampHelper.prototype.register = function () {
        var args,
            $this = this;
        Handlebars.registerHelper('$timestamp', this.render.bind(this));
    };

    TimestampHelper.prototype.render = function (options) {
        var data;
        if (options.data) {
            data = Handlebars.createFrame(options.data || {});
        }
        return (!Date.now) ? new Date().getTime() : Date.now();
    };

    module.exports = TimestampHelper;

}());
