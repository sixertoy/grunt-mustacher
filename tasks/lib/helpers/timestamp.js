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
        Handlebars = require('handlebars');

    TimestampHelper = function () {};

    TimestampHelper.prototype.register = function () {
        Handlebars.registerHelper('$timestamp', this.render.bind(this));
    };

    TimestampHelper.prototype.render = function (count, options) {
        var data, time;
        if(arguments.length < 2){
            options = count;
            count = 0;
        }
        if (options.data) {
            data = Handlebars.createFrame(options.data || {});
        }
        time = (!Date.now) ? new Date().getTime() : Date.now();
        return (time + count);
    };

    module.exports = TimestampHelper;

}());
