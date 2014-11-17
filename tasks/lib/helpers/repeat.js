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
/*global require, module */
(function () {
    'use strict';

    var RepeatHelper,
        Grunt = require('grunt'),
        Lodash = require('lodash'),
        Handlebars = require('handlebars');

    RepeatHelper = function () {};

    RepeatHelper.prototype.register = function () {
        Handlebars.registerHelper('repeat', this.render.bind(this));
    };

    /**
     * @TODO ajout d'un string comme arg pour parametrage custom
     * @see htt://placehold.it
     */
    RepeatHelper.prototype.render = function (count, options) {
        if (arguments.length <= 1) {
            throw new Error('Repeat arguments is missing');
        }
        if (!Lodash.isFunction(options.fn)) {
            throw new Error('Repeat arguments is not an handlebars context');
        }
        count = parseFloat(count);
        if (Lodash.isNaN(count)) {
            throw new Error('Repeat arguments is not valid');
        }
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
    };

    module.exports = RepeatHelper;

}());
