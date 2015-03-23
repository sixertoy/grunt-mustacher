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
        lodash = require('lodash'),
        Utils = require('./../task-utils'),
        Handlebars = require('handlebars'),
        lf = Grunt.util.linefeed,
        debug = Grunt.option('debug');

    IncludeHelper = function () {};

    IncludeHelper.prototype.register = function () {
        Handlebars.registerHelper('$include', this.render.bind(this));
    };

    IncludeHelper.prototype.render = function (path, options) {

        var data, root, content, // .hbs content
            absolute, // absolute .hbs path form system root
            relative, // relative path from cwd to .hbs
            output = 'Unable to load file',
            args = Utils.hasOptions(arguments);

        if (!args || args.length < 2 || !lodash.isString(path)) {
            throw new Error('IncludeHelper missing arguments');
        }

        data = Handlebars.createFrame(options.data || {});
        root = data.root;

        // @TODO to test file path
        absolute = Path.join(root.cwd, root.partials.src, path);
        absolute = Path.normalize(absolute + root.partials.ext);
        relative = Path.relative(root.cwd, absolute);

        if (!Grunt.file.exists(relative)) {
            output = output + ' ' + relative;
            Grunt.log.error(output);
        } else {
            content = Grunt.file.read(relative);
            output = Handlebars.compile(content)(relative, {
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
