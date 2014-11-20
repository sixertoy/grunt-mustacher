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
 * http://img.shields.io/travis/sixertoy/grunt-mustacher?style=flat-square
 *
 */
/*jslint plusplus: true, indent: 4 */
/*global module, require */
module.exports = function (grunt) {
    'use strict';
    // load configs
    require('load-grunt-config')(grunt, {
        data: {
            bump:{type:'', scope:'', subject:'', body:''},
            banner: grunt.file.read('./grunt/banner.tpl', 'utf-8')
        }
    });

    grunt.registerTask('deploy', 'Commit with prompt changelog quesions', function () {
            grunt.task.run('prompt', 'bump-commit', 'changelog');
        });

    // Tasks
    grunt.loadTasks('tasks');
};
