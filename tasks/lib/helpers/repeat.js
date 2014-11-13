/**
 *
 * Repeater/Loop
 *
 * @author malas34 <malas34.github@gmail.com>
 * @see https://github.com/malas34/grunt-mustacher/tree/master/tests/lib/helpers/random_test.js
 * @version 1.0.0
 * @since 30 Jul 2014
 *

    The MIT License (MIT)

    Copyright (c) <year> <copyright holders>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
 */
'use strict';

var MustacherRepeatHelper,
    Handlebars = require('handlebars');

var _utils = require('../utils');

MustacherRepeatHelper = (function (_) {

    function MustacherRepeatHelper() {}

    MustacherRepeatHelper.prototype.register = function () {
        var args,
            $this = this;
        _.registerHelper('repeat', function () {
            args = _utils.arguments(arguments);
            return $this.compile.apply($this, args);
        });
    };
    /**
     * @TODO ajout d'un string comme arg pour parametrage custom
     * @see htt://placehold.it
     */
    MustacherRepeatHelper.prototype.compile = function (count, options) {
        var hash = {},
            data = {},
            result = '',
            context = options || {};
        if (arguments.length > 1) {

            data = Handlebars.createFrame( options.data || {} );
            data = _utils.concat( options.hash, data );

            for (var i = 0; i < count; i++) {
                hash = {};
                hash.index = i;
                hash.odd = (i % 2);
                hash.even = !(i % 2);
                hash.first = (i === 0);
                hash.last = (i === (count - 1));
                hash.classes = ((hash.even) ? 'even' : 'odd') + ' ' + ((hash.first) ? 'first' : (hash.last) ? 'last' : '');
                result += context.fn(this, { data: data, hash:hash } );
            }
            return result;

        } else {
            throw new Error('MustacherRepeatHelper count parameters is missing');
        }
    };

    return MustacherRepeatHelper;

})(Handlebars);

module.exports = new MustacherRepeatHelper();
/*
var MustacherEqualHelper,
    Grunt = require('grunt'),
    Handlebars = require('handlebars');

var _utils = require('../utils');

MustacherRepeatHelper = (function (_, Grunt) {

    MustacherRepeatHelper.prototype.compile = function (count, options) {

        var d = {},
            result = '',
            counts = [],
            context = {},
            length = count,
            is_even = false;

        if (arguments.length > 1) {

            if( arguments.length > 2)
            {
                context = JSON.parse( options );
                d = _utils.concat( d, context );
                options = arguments[ arguments.length - 1 ];
            }

            for (var i = 0; i < length; i++) {

                // var is_even = (j % 2);

                d.index = i;
                // d.odd = !is_even;
                // d.even = is_even;
                d.first = (i === 0);
                d.last = (i === (length - 1));

                result += options.fn(counts[i], {
                    data: d
                });
            }
            return result;
        } else {
            Grunt.log.error('Handlebars #repeat helper parameters is missing');
            return false;
        }
    };
    */

/*
    _.registerHelper('repeat', function (context, extras, options) {
        var r = "",
            d = {};

        if (arguments.length > 1) {

            if (arguments.length <= 2) {
                context = context;
                options = extras;
                extras = {};
            }

            extras = parseContext(extras);

            if (_.Utils.isFunction(context)) {
                context = context.call(this);
            }

            if (options.data) {
                d = _.createFrame(options.data);
            }

            var counts = [];
            var length = parseFloat(context);
            for (var j = 0; j < length; j++) {
                var is_odd = (j % 2);
                counts.push({
                    count: (j + 1),
                    odd: is_odd,
                    even: !is_odd
                });
            }
            for (var i = 0; i < length; i++) {
                if (d) {
                    d.index = i;
                    d.first = (i === 0);
                    d.last = (i === (length - 1));
                }
                r += options.fn(counts[i], {
                    data: d
                });
            }
            return r;
        } else {
            return false;
        }
    });

    return MustacherRepeatHelper;

})(Handlebars, Grunt);

module.exports = new MustacherRepeatHelper();
    */
