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

    var LivereloadHelper,
        Grunt = require('grunt'),
        LoDash = require('lodash'),
        Handlebars = require('handlebars');

    LivereloadHelper = function () {};

    LivereloadHelper.prototype.register = function () {
        Handlebars.registerHelper('$livereload', this.render.bind(this));
    };

    LivereloadHelper.prototype.render = function (port, options) {
        if (arguments.length < 1) {
            throw new Error('Unable to parse helper');
        }

        if (LoDash.isObject(port) && !LoDash.isArray(options)) {
            options = port;
            port = 1337;
        }

        var result = '';
        // if(Grunt.option('debug')){
            result = '<script src="http://localhost:' + port + '/livereload.js"></script>';
        // }
        return new Handlebars.SafeString(result);

    };

    module.exports = LivereloadHelper;

}());
