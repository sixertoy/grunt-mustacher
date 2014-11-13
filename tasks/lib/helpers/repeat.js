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

    RepeatHelper = function () {
        this.count = null;
        this.lf = Grunt.util.linefeed;
        // Private methods
        this.getCount = function () {
            return this.count;
        };
    };

    RepeatHelper.prototype.register = function () {
        var args,
            $this = this;
        Handlebars.registerHelper('repeat', function () {
            args = Lodash.toArray(arguments);
            return $this.compile.apply($this, args);
        });
    };

    /**
     * @TODO ajout d'un string comme arg pour parametrage custom
     * @see htt://placehold.it
     */
    RepeatHelper.prototype.compile = function (count, options) {
        var i, opts, context, result = [];
        if (arguments.length > 1) {
            //
            context = options || {};
            if (!Lodash.isFunction(context.fn)) {
                throw new Error('Repeat arguments is not an handlebars context');
            }
            //
            this.count = parseFloat(count);
            if (Lodash.isNaN(this.count)) {
                throw new Error('Repeat arguments is not valid');
            }
            var data = Handlebars.createFrame(options.data);
            // opts.data = Handlebars.createFrame(context.data || {});
            // data.foo = 'bar';
            // options.data = data;
            //hash = Handlebars.createFrame(context.data || {});
            // Lodash.merge(hash, options.hash);
            opts = {
                hash: {}
            };
            for (i = 0; i < this.count; i++) {
                opts.data = {
                    zindex: i,
                    index: (i + 1),
                    of: this.count,
                    odd: ((i % 2) ? false : true), // pair
                    even: ((i % 2) ? true : false), // impair
                    first: (i === 0),
                    last: (i === (this.count - 1))
                };
                opts.data.class = (opts.data.odd ? 'odd' : 'even');
                opts.data.class += (opts.data.last ? ' last' : '');
                opts.data.class += (opts.data.first ? ' first' : '');
                result.push((context.fn(this, opts) || '').trim());
            }
            return result.join(this.lf) + this.lf;
        } else {
            throw new Error('Repeat arguments is missing');
        }
    };

    module.exports = RepeatHelper;

}());
