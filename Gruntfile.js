/*
 * Mustacher
 * https://github.com/malas34/malas34
 *
 * Copyright (c) 2014 Matthieu Lassalvy
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
        'test/*.js',
        'Gruntfile.js',
        'tasks/**/*.js'
      ],
            options: {
                jshintrc: '.jshintrc',
            },
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp/*'],
        },

        // Configuration to be run (and then tested).
        mustacher: {
            single_files: {
                options: {
                    data_ext:'.json',
                    partials: 'test/fixtures/'},
                files: {
                    'tmp/index.html': 'test/fixtures/index.mustache',
                },
            },
            single_files_autocontext: {
                options: {
                    data_ext:'.json',
                    partials: 'test/fixtures/'},
                files: {
                    'tmp/autocontext.html': 'test/fixtures/autocontext.mustache',
                },
            },
            single_files_context: {
                options: {
                    partials: 'test/fixtures/loops'
                },
                files: [
                    {
                        dest: 'tmp/context.html',
                        src: 'test/fixtures/context.mustache',
                        context: 'test/fixtures/context.json'
                    },
                ],
            },
            multiple_files: {
                options: {
                    data_ext:'.json',
                    partials: 'test/fixtures/loops/'
                },
                files: [
                    {
                        expand: true,
                        dest: 'tmp/',
                        ext: '.html',
                        src: '*.mustache',
                        cwd: 'test/fixtures/'
                    },
                ],
            },
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js'],
        },

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    //    grunt.registerTask('test', ['clean', 'mustacher', 'nodeunit']);
    //    grunt.registerTask('test', ['clean', 'mustacher']);
    grunt.registerTask('test', ['clean', 'mustacher:multiple_files', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
