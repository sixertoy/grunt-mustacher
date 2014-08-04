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

        mustacher: {
            compile: {
                files: [
                    {
                        src: 'output/mustache/index.hbs',
                        dest: 'output/html/index.html'
                    }
                ]
            },
            templates:{
                options: {
                    outputExtension: '.tpl'
                },
                files: [{
                    expand: true,
                    cwd: 'output/mustache/commons/',
                    src: '**/*.hbs',
                    dest: 'output/tpl/commons/',
                }]
            },
            html:{
                options: {
                    outputExtension: '.html'
                },
                files: [{
                    expand: true,
                    cwd: 'html/tpl/',
                    src: '*.tpl',
                    dest: 'html/html/',
                }]
            }
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
    grunt.registerTask('html', ['mustacher:html']);
    grunt.registerTask('templates', ['mustacher:templates']);
    grunt.registerTask('default', ['mustacher:compile']);

};
