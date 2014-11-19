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
    var IncludeHelper,
        Path = require('path'),
        Grunt = require('grunt'),
        LoDash = require('lodash'),
        Handlebars = require('handlebars'),
        lf = Grunt.util.linefeed,
        debug = Grunt.option('debug');

    IncludeHelper = function () {};

    IncludeHelper.prototype.register = function () {
        Handlebars.registerHelper('$include', this.render.bind(this));
    };

    IncludeHelper.prototype.render = function (path, options) {

        var data, root,
            content, // .hbs content
            absolute, // absolute .hbs path form system root
            relative, // relative path from cwd to .hbs
            output = 'Unable to load file';

        if (arguments.length < 2) {
            throw new Error('Include arguments is missing');
        }

        if (!LoDash.isString(path)) {
            throw new Error('Include arguments is not string');
        }

        data = Handlebars.createFrame(options.data);
        root = data.root;

        /*
        if(root.hasOwnProperty('includes')){
            root.includes = {};
            root.includes[path] = 0;
        }
        root.includes[path] = (root.includes[path] + 1);

        if(root.includes[path] > root.depth){
            throw new Error('Include too much ');
        }
        */

        absolute = Path.join(root.cwd, root.partials.src, path + root.partials.ext);
        relative = Path.relative(root.cwd, absolute).split('\\').join('/');

        if (!Grunt.file.exists(Path.normalize(absolute))) {
            output = output + ' ' + relative;
            Grunt.log.error(output);
        } else {
            content = Grunt.file.read(Path.normalize(absolute));
            output = Handlebars.compile(content)(absolute, {
                data: data
            }).trim();
        }

        if (debug) {
            output = '<!-- ' + relative + ' -->' + lf + output + lf + '<!-- endof ' + relative + ' -->';
        }

        return new Handlebars.SafeString(output.trim());
    };

    module.exports = IncludeHelper;

}());
