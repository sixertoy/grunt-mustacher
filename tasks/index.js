/*
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
'use strict';

var handlebarsHelpers = [
    'equal',
    // 'image',
    // 'include',
    'lorem',
    'random'
    // 'repeat',
    // 'timestamp'
];

module.exports = function (grunt) {
    var _mustacher = require('../lib/mustacher');
    grunt.registerMultiTask('mustacher', 'Handlebars Template Helpers.', function () {
        _mustacher.init.call(this,handlebarsHelpers);
        _mustacher.render.call(this);
    });
};
