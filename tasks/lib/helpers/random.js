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

    var RandomHelper,
        LoDash = require('lodash'),
        Utils = require('./../task-utils'),
        Handlebars = require('handlebars');

    RandomHelper = function () {};

    RandomHelper.prototype.register = function () {
        Handlebars.registerHelper('$random', this.render.bind(this));
    };

    /**
     * @TODO ajout d'un string comme arg pour parametrage custom
     * @see htt://placehold.it
     */
    RandomHelper.prototype.render = function (min, max, round, options) { // jshint ignore:line

        if (!Utils.containsOptions(arguments)) {
            throw 'Random helper arguments is missing';
        }

        if (arguments.length < 2) {
            return LoDash.random(0, 1, false);
        }

        if (arguments.length < 3) {
            if (LoDash.isNumber(min)) {
                return LoDash.random(0, min, false);
            } else if (LoDash.isBoolean(min)) {
                return LoDash.random(0, 1, min);
            } else {
                throw 'Random helper unknow arguments';
            }
        }

        if (arguments.length < 4) {
            if (LoDash.isNumber(max)) {
                return LoDash.random(min, max, false);
            } else if (LoDash.isBoolean(max)) {
                return LoDash.random(0, min, max);
            } else {
                throw 'Random helper unknow arguments';
            }
        }

        try {
            return LoDash.random(min, max, round);
        } catch (e) {
            throw e;
        }

    };

    module.exports = RandomHelper;

}());
