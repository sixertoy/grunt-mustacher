/**
 *
 * Grunt Mustacher Task
 * https://github.com/sixertoy/grunt-mustacher
 *
 * Copyright (c) 2015 Matthieu Lassalvy
 * Licensed under the MIT license.
 *
 */
/*jslint plusplus: true, indent: 4 */
/*global module, require */
module.exports = function (grunt) {
    'use strict';
    // load task
    grunt.loadTasks('tasks');
    // load configs
    require('load-grunt-config')(grunt);
};
