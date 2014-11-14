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
        /*
        Handlebars.registerHelper('repeat', function () {

            console.log(arguments);
            console.log(this);

            args = Lodash.toArray(arguments);
            return $this.compile.apply($this, args);
        });
        */
        Handlebars.registerHelper('repeat', $this.render.bind($this));

    };

    /**
     * @TODO ajout d'un string comme arg pour parametrage custom
     * @see htt://placehold.it
     */
    RepeatHelper.prototype.render = function (count, options) {

        console.log(options);

        var i, data, result = [];
        if (arguments.length > 1) {
            if (!Lodash.isFunction(options.fn)) {
                throw new Error('Repeat arguments is not an handlebars context');
            }
            //
            this.count = parseFloat(count);
            if (Lodash.isNaN(this.count)) {
                throw new Error('Repeat arguments is not valid');
            }
            for (i = 0; i < this.count; i++) {
                // @TODO
                // create an object
                // and merge with existant
                if (options.data) {
                    data = Handlebars.createFrame(options.data || {});
                    data.zindex = i;
                    data.index = (i + 1);
                    data.of = this.count;
                    data.odd = ((i % 2) ? false : true); // pair
                    data.even = ((i % 2) ? true : false); // impair
                    data.first = (i === 0);
                    data.last = (i === (this.count - 1));
                    data.class = (data.odd ? 'odd' : 'even');
                    data.class += (data.last ? ' last' : '');
                    data.class += (data.first ? ' first' : '');
                }
                result.push((options.fn({}, {data:data, trackIds: true}) || '').trim());
            }
            return result.join(this.lf) + this.lf;
        } else {
            throw new Error('Repeat arguments is missing');
        }
    };

    module.exports = RepeatHelper;

}());
