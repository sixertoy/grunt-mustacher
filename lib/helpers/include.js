/**
 *
 * Generate Dummy image from placehold.it
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

var MustacherIncludeHelper,
    Path = require('path'),
    Grunt = require('grunt'),
    Handlebars = require('handlebars');

var _utils = require('../utils');

MustacherIncludeHelper = (function (_,Grunt,Path) {

    var root = 'html/',
        extension = '.hbs';


    function MustacherIncludeHelper() {}

    MustacherIncludeHelper.prototype.register = function () {
        var args,
            $this = this;
        _.registerHelper('$include', function (partial,options) {
            args = _utils.arguments(arguments);
            return $this.compile.apply($this, args);
        });
    };
    /**
     * @TODO ajout d'un string comme arg pour parametrage custom
     * @see htt://placehold.it
     */
    MustacherIncludeHelper.prototype.compile = function (partial,options) {
        var func,
            after,
            stream,
            output,
            before,
            result = '',
            cwd = process.cwd(),
            context = options || {},
            lf = Grunt.util.linefeed,
            file = partial + extension;

        if (arguments.length > 1  && _utils.isString( partial ) ) {

            if( Grunt.file.exists( file ) ){

                stream = Grunt.file.read( file );
                Grunt.file.setBase( Path.dirname( file ) );
                func = _.compile( stream );
                before = lf + "<!-- " + file + "-->" + lf;
                after = lf + "<!-- endof " + file + "-->";
                output = func( options, context );
                output = _utils.removeEmptyChars( output );
                output = ( before + output + after );
                Grunt.file.setBase( cwd );
                return new _.SafeString(output);

            }
            else{
                throw new Error('MustacherIncludeHelper ' +file+ ' is missing');
            }


        } else {
            throw new Error('MustacherIncludeHelper arguments is missing');
        }
    };

    return MustacherIncludeHelper;

})(Handlebars,Grunt,Path);

module.exports = new MustacherIncludeHelper();

/*
_.registerHelper('$include', function (context, extras, options) {
                var a, d, f, fn;

                if (arguments.length > 1) {

                    if (arguments.length <= 2) {
                        context = context;
                        options = extras;
                        extras = {};
                    }

                    extras = parseContext( opts );

                    if (
                        typeof context === 'string'
                    ) {

                        if (options.data) {
                            d = _.createFrame(options.data);
                        }

                        // pour les variables @ mettre a la racine d' l'objet
                        var abs = {
                            data: {name: context},
                            name: context
                        };
                        abs.data = concat(abs.data, extras);
                        abs = concat(abs, extras);

                        d = concat( d, extras, options, this, abs );

                        if (
                            (typeof _.partials[context] !== 'object') || !_.Utils.isFunction(_.partials[context].fn)
                        ) {
                            f = extras.partials + '/' + context + extras.extension;
                            if (!grunt.file.exists(f)) {
                                grunt.log.error("Unable to find source " + f);
                                return false;
                            } else {
                                fn = _.compile(grunt.file.read(f));
                                _.partials[context] = {};
                                _.partials[context].fn = fn;
                                _.partials[context].f = f;
                            }
                        } else {
                            f = _.partials[context].f;
                            fn = _.partials[context].fn;
                        }
                        // @TODO Evite les infinite loops
                        var after = "<!-- endof " + f + "-->";
                        var before = "<!-- " + f + "-->";
                        var output = fn(d).replace(/^\s+/, '').replace(/^\t+/, '');
                        output = (before + output + after);
                        return new _.SafeString(output);
                    } else {
                        // @TODO chargement des objects
                    }
                } else {
                    return false;
                }
            });
            */
