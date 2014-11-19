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
        // Grunt = require('grunt'),
        LoDash = require('lodash'),
        Handlebars = require('handlebars');

    IncludeHelper = function () {};

    IncludeHelper.prototype.register = function () {
        Handlebars.registerHelper('$include', this.render.bind(this));
    };

    IncludeHelper.prototype.render = function (path, options) {

        if (arguments.length < 2) {
            throw new Error('Include needs one parameters at least');
        }

        if (!LoDash.isString(path)) {
            throw new Error('Include arguments is not a string');
        }
        options = null;

        // console.log(options);

        // if (!LoDash.isFunction(options.data.partials)) {

        /*
        if (!LoDash.isFunction(options.fn)) {
            throw new Error('Include arguments is not in an handlebars context');
        }
        */


        /*
        if( Grunt.file.exists() ){
            console.logh
        }
        */

        /*
        }
        */

        /*
        var i, data, context, pf = '',
            output = '';
        for (i = 0; i < count; i++) {
            if (options.data) {
                data = Handlebars.createFrame(options.data || {});
                data.index = i;
                data.first = (i === 0);
                data.last = (i === (count - 1));
                data.odd = ((i % 2) ? false : true); // pair
                data.even = ((i % 2) ? true : false); // impair
            }
            context = {
                of: count,
                count: (i + 1),
                class: (data.odd ? 'odd' : 'even') + (data.last ? ' last' : '') + (data.first ? ' first' : '')
            };
            output += options.fn(context, {
                data: data
            });
        }
        return output;
        */

    };

    module.exports = IncludeHelper;

}());
