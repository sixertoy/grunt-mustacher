/*
 * Grunt Mustacher
 * https://github.com/malas34/malas34
 *
 * Copyright (c) 2014 Matthieu Lassalvy
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {



    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc',
            },
            all: [
                'Gruntfile.js',
                'tests/*.js'
            ],
        },

        clean: {
            tests: ['tmp/*'],
        },

        nodeunit: {
            tests: ['tests/**/*_test.js'],
        },

        /*
        mustacher: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'bin/html/',
                    src: '** *.hbs',
                    dest: 'dev/html/',
                    ext: '.tpl'
                }]
            },
            html: {
                options: {
                    extension: '.tpl'
                },
                files: [{
                    expand: true,
                    cwd: 'dev/html/',
                    src: '*.tpl',
                    dest: 'prod/html/',
                    ext: '.html'
                }]
            }
        },
        */

        mustacher: {
            compile: {
                files: [
                    {
                        options: {
                            extension: '.tpl'
                        },
                        src: 'html/index.hbs',
                        dest: 'html/index.html'
                    }
                ]
            },
            /*
            templates:{
                options: {
                    extension: '.tpl'
                },
                files: [{
                    src: '*.hbs',
                    cwd: 'html/',
                    expand: true,
                    dest: 'html/',
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
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('test', ['jshint', 'nodeunit']);
    grunt.registerTask('templates', ['mustacher:templates']);
    grunt.registerTask('default', ['mustacher:compile']);

};
