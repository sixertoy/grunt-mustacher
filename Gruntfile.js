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

        // Prettify HTML code
        prettify: {
            options: {
                indent: 4
            },
            defaults: {
                files: [{
                    expand: true,
                    cwd: 'tmp/',
                    src: ['*.html'],
                    dest: 'tmp/p/',
                    ext: '.html'
            }],
            },
        },

        // Configuration to be run (and then tested).
        mustacher: {
            options: {
                data_src: 'data/',
                partials: 'test/fixtures/loops/'
            },
            repeat: {
                files: [{
                    dest: 'tmp/repeat.html',
                    src: 'test/fixtures/repeat.mustache'
                }]
            },
            include: {
                files: {
                    'tmp/include.html': 'test/fixtures/include.mustache'
                }
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
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['nodeunit']);
    grunt.registerTask('all', ['clean', 'mustacher:include', 'prettify']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'all']);

};
