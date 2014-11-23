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

    var ConditionsHelper,
        // lodash = require('lodash'),
        Utils = require('../task-utils'),
        Handlebars = require('handlebars');

    ConditionsHelper = function () {};

    ConditionsHelper.prototype.register = function () {
        Handlebars.registerHelper('or', this.render.bind(this));
        Handlebars.registerHelper('and', this.render.bind(this));
    };

    ConditionsHelper.prototype.render = function (options) {
        var args = Utils.hasOptions(arguments);
        if (!args || args.length < 3) {
            throw new Error('Conditions helper parameters is missing');
        }

        options = args[args.length - 1];
        var name = options.name;

        switch (name) {
        case 'or':
            break;
        case 'and':
            break;
        }

        return name;

    };

    module.exports = ConditionsHelper;

}());
