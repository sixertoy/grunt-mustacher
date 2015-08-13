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
/*jslint indent: 4 */
/*global module, require */
(function () {

    'use strict';

    var ImageHelper,
        lodash = require('lodash'),
        Utils = require('./../task-utils'),
        Handlebars = require('handlebars');

    ImageHelper = function () {};

    ImageHelper.prototype.register = function () {
        Handlebars.registerHelper('$image', this.render.bind(this));
    };

    ImageHelper.prototype.render = function (width, height, options) {

        var result = '',
            context = options || {},
            args = Utils.hasOptions(arguments);

        if (!args || args.length < 1) {
            throw new Error('Image helper missing arguments');
        }
        if (args.length < 2) {
            options = width;
            height = false;
            width = false;
        } else if (args.length === 2) {
            options = height;
            height = false;
        }
        width = lodash.isNumber(width) ? width : 300;
        result = 'http://placehold.it/' + width;
        if (lodash.isNumber(height)) {
            result += 'x' + height;
        }
        return new Handlebars.SafeString('<img src="' + result + '" alt="" title="" />');
    };

    module.exports = ImageHelper;

}());
