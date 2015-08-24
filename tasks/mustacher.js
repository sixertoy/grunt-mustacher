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
/*global module, require, process */
(function () {
    'use strict';
    var // variables
        defaults,
        // requires
        merge = require('lodash.merge'),
        // assign = require('lodash.assign'),
        mustacher = require('mustacher');

    /**
     *
     * Defaults options
     *
     */
    defaults = {
        src: null,
        dest: null,
        ext: '.html', // output/compiled file extension
        expand: false,
        flatten: false, // Remove all path parts from generated dest paths.
        extDot: 'first', // Extensions in filenames begin after the first dot
        cwd: process.cwd(), // relative path to src
        delimiter: {
            ldim: '{{',
            rdim: '}}'
        },
        //
        partials: {
            depth: 2,
            ext: '.hbs',
            src: 'partials/'
        },
        context: {}
    };

    /**
     *
     * Grunt Task
     *
     */
    module.exports = function (grunt) {
        grunt.registerMultiTask('mustacher', 'Handlebars Template Helpers.', function () {
            var $this = this,
                done = this.async();
            if (!this.files.length) {
                done(new Error('Files argument is needed'));
            } else {
                this.files.forEach(function (task) {
                    if (!task.src.length) {
                        done(new Error('No Mustache files parse to parse'));
                    } else {

                        var options = merge({}, defaults);
                        options = merge(options, $this.options());
                        // console.log(options);
                        var dest, stream,
                            content = task.src.map(function (filepath) {
                                stream = grunt.file.read(filepath);
                                if (stream) {
                                    return mustacher(stream, {}, {
                                        root: options
                                    });
                                } else {
                                    return '';
                                }
                            }).join(grunt.util.normalizelf(grunt.util.linefeed));
                        dest = task.dest;
                        grunt.file.write(dest, content);
                        grunt.log.ok('File "' + dest + '" created.');
                        done(true);
                    }
                });
            }
        });
    };

}());
