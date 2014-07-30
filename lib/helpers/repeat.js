/**

 http://handlebarsjs.com/block_helpers.html

*/
'use strict';

var MustacherEqualHelper,
    Grunt = require('grunt'),
    Handlebars = require('handlebars');

var _utils = require('../utils');

MustacherRepeatHelper = (function (_, Grunt) {

    function MustacherRepeatHelper() {}

    MustacherRepeatHelper.prototype.register = function () {
        var $this = this;
        _.registerHelper('repeat', function () {
            var args = _utils.arguments(arguments);
            var result = $this.compile.apply($this, args);
            return result;
        });
    };

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
    */

    return MustacherRepeatHelper;

})(Handlebars, Grunt);

module.exports = new MustacherRepeatHelper();
