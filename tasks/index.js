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
/*global module, require */
(function () {

    'use strict';

    var Mustacher = require('lib/mustacher'),
        Helpers = [
            'equal',
            'image',
            'include',
            'lorem',
            'random',
            'repeat',
            'timestamp'
        ];

    module.exports = function (grunt) {

        grunt.registerMultiTask('mustacher', 'Handlebars Template Helpers.', function () {
            /*
            Mustacher.init.call(this, handlebarsHelpers);
            Mustacher.render.call(this);
            */
        });
    };
}());
