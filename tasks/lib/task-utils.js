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
/*global module */
(function () {

    'use strict';

    var lodash = require('lodash');

    function TaskUtils() {}

    /**
     *
     * @param args [arguments]
     *
     */
    TaskUtils.prototype.hasOptions = function (args) {
        var options, options;
        if (args === null || args === undefined || args.length < 1) {
            return false;
        }
        args = lodash.toArray(args);
        options = args[args.length - 1];
        return lodash.isPlainObject(options) && options.hasOwnProperty('name') ? args : false;
    };

    module.exports = new TaskUtils();

}());
