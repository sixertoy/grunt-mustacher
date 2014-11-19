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
/*global module */
module.exports = function (grunt) {
    'use strict';
    // load configs
    require('load-grunt-config')(grunt, {
        data: {
            banner: grunt.file.read('./grunt/banner.tpl', 'utf-8')
        }
    });
    // Tasks
    grunt.registerTask('default', ['jshint', 'jasmine_node']);
    grunt.registerTask('compile', ['jshint', 'mustacher:compile']);
};
