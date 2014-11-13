/**
 * Grunt Mustacher
 *
 * Copyright (c) 2014 Matthieu Lassalvy
 * Licensed under the MIT license.
 */
/*global module */
(function () {

    'use strict';

    module.exports = function (grunt) {

        grunt.initConfig({
            /** ------------------------------------

 JSHint task

 */
            jshint: {
                options: {
                    jshintrc: '.jshintrc'
                },
                all: ['Gruntfile.js', 'specs/*.js']
            },
            /** ------------------------------------

 Jasmine task

 */
            jasmine: {
                all: {
                    options: {
                        specs: 'specs/*.test.js'
                    },
                    src: ['tasks/**/*.js']
                }
            },
            /** ------------------------------------

 Clean task

 */
            clean: {
                tests: ['tmp/*']
            },
            /** ------------------------------------

 Mustacher task

 */
            mustacher: {
                compile: {
                    files: [{
                        src: 'templates/commons/head.tpl',
                        dest: 'html/commons/head.html'
                    }, {
                        src: 'templates/index.tpl',
                        dest: 'html/index.html'
                    }]
                }
                /*
                templates: {
                    files: [{
                        expand: true,
                        cwd: 'output/hbs/commons/',
                        src: '.hbs',
                        dest: 'output/tpl/commons/',
                        ext: '.tpl'
                }]
                },

                html: {
                    files: [{
                        expand: true,
                        cwd: 'html/tpl/',
                        src: '*.tpl',
                        dest: 'html/html/',
                        ext: '.html'
                }]
                }
                */
            }

        });
        /* -----------------------------------------------------------------------------

 Tasks

----------------------------------------------------------------------------- */
        grunt.loadTasks('tasks');

        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-htmlmin');
        grunt.loadNpmTasks('grunt-contrib-jasmine');

        grunt.registerTask('tests', ['jshint', 'jasmine']);
        grunt.registerTask('default', ['jshint', 'mustacher:compile']);

    };
}());
