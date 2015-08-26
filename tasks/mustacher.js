/*jslint plusplus: true, indent: 4, nomen:true */
/*global module, require, process */
(function () {
    'use strict';
    var // variables
        _options = {
            cwd: process.cwd(), // relative path to src
            delimiter: {
                ldim: '{{',
                rdim: '}}'
            },
            partials: {
                depth: 2,
                ext: '.hbs',
                src: 'partials/'
            }
        },
        // requires
        merge = require('lodash.merge'),
        mustacher = require('mustacher');

    /**
     *
     * Grunt Task
     *
     */
    module.exports = function (grunt) {
        grunt.registerMultiTask('mustacher', 'Handlebars Template Helpers.', function () {
            var context, dest, stream, options, content,
                $this = this,
                done = this.async();
            if (!this.files.length) {
                done(new Error('Files argument is needed'));
            } else {
                this.files.forEach(function (task) {
                    if (!task.src.length) {
                        done(new Error('No Mustache files parse to parse'));
                    } else {
                        context = $this.options().context || {};
                        options = merge(_options, {
                            cwd: process.cwd(),
                            partials: $this.options().partials || {},
                            delimiter: $this.options().delimiter || {}
                        });
                        content = task.src.map(function (filepath) {
                            stream = grunt.file.read(filepath);
                            if (stream) {
                                return mustacher(stream, context, options);
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