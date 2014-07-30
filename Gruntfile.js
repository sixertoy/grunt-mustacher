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
                        options: {
                            extension: '.tpl'
                        },
                        src: 'html/index.hbs',
                        dest: 'html/index.html'
                    }
                ]
            }
        }

    });
    /* -----------------------------------------------------------------------------

 Tasks

----------------------------------------------------------------------------- */
    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('test', ['jshint', 'nodeunit']);
    grunt.registerTask('default', ['mustacher']);

};
