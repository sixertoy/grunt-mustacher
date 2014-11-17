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
/*global require, module */
(function () {
    'use strict';

    var RepeatHelper,
        Utils = require('./../task-utils'),
        Grunt = require('grunt'),
        lodash = require('lodash'),
        Handlebars = require('handlebars');

    RepeatHelper = function () {};

    RepeatHelper.prototype.register = function () {
        Handlebars.registerHelper('$random', this.render.bind(this));
    };

    RepeatHelper.prototype.parseMin = function (value) {};

    /**
     * @TODO ajout d'un string comme arg pour parametrage custom
     * @see htt://placehold.it
     */
    RepeatHelper.prototype.render = function (min, max, round, options) { // jshint ignore:line

        if (!Utils.containsOptions(arguments)) {
            throw 'Random helper arguments is missing';
        }

        if (arguments.length < 2) {
            return lodash.random(0, 1, false);
        }

        if (arguments.length < 3) {
            if (lodash.isNumber(min)) {
                return lodash.random(0, min, false);
            } else if (lodash.isBoolean(min)) {
                return lodash.random(0, 1, min);
            } else {
                throw 'Random helper unknow arguments';
            }
        }

        if (arguments.length < 4) {
            if (lodash.isNumber(max)) {
                return lodash.random(min, max, false);
            } else if (lodash.isBoolean(max)) {
                return lodash.random(0, min, max);
            } else {
                throw 'Random helper unknow arguments';
            }
        }

        try {
            return lodash.random(min, max, round);
        } catch (e) {
            throw e;
        }

    };

    module.exports = RepeatHelper;

}());
