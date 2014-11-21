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
(function () {

    'use strict';

    var lodash = require('lodash');

    function TaskUtils() {}

    /**
     *
     * @param args [arguments]
     *
     */
    TaskUtils.prototype.containsOptions = function (args) {
        /*
        var i,
            result = false,
            args = lodash.toArray(args);
        if(args.length < 1){
            return result;
        }
        for (i = 0; i < array.length; i++) {
            if (!result) {
                if (typeof array[i] === 'object' && array[i] !== null) {
                    if (array[i] instanceof Object && Object.prototype.toString.call(array[i]) === '[object Object]') {
                        result = true;
                    }
                }
            }
        }
        return result;
        */
        var array,
            index = -1,
            item = null,
            result = false;
        if (args === null || args === undefined || args.length < 1) {
            return result;
        }
        array = lodash.toArray(args);
        item = array[array.length - 1];
        if (typeof item === 'object' && item !== null) {
            if (item instanceof Object && Object.prototype.toString.call(item) === '[object Object]') {
                result = true;
            }
            if(result && item.hasOwnProperty('fn')){
                result = true;
            } else {
                result = false;
            }
        }
        return result;
    };

    TaskUtils.prototype.removeEmptyChars = function (str) {
        return str.trim().replace(/^\s+/, '').replace(/^\t+/, '');
    };

    module.exports = new TaskUtils();

    // @TODO unittest
    /*
    MustacherUtils.prototype.isEmpty = function (obj) {
        if (this.isObject(obj)) {
            return (Object.keys(obj).length === 0);
        } else if (typeof (obj) === 'string') {
            return (obj.trim().length === 0);
        } else if (typeof (obj) === 'number') {
            return (obj === 0);
        } else if (typeof (obj) === 'object' && obj.hasOwnProperty('length')) {
            return (obj.length === 0);
        }
        return false;
    };

    MustacherUtils.prototype.isJSONContext = function (context) {
        var length, hasStart, hasEnd, result;
        if (this.isString(context)) {
            length = context.length;
            hasStart = (context.indexOf('{') === 0);
            hasEnd = (context.lastIndexOf('}') === (length - 1));
            if (hasStart && hasEnd) {
                try {
                    result = JSON.parse(context);
                    return (this.isObject(result) && !this.isEmpty(result));
                } catch (e) {
                    Grunt.log.error('ERROR :: mustacher.parseJSONContext() :: context must be a JSON type');
                    return false;
                }
            }
        }
        return false;
    };

    MustacherUtils.prototype.parseContext = function (context) {
        if (this.isJSONContext(context)) {
            try {
                return (JSON.parse(context));
            } catch (e) {
                Grunt.log.error('MustacherUtils.parseJSONContext() :: context must be a JSON type');
                return false;
            }
        }
        return context;
    };

    // @TODO Tests Unitaires
    MustacherUtils.prototype.concat = function () {
        var obj = [];
        for (var i = 0; i < arguments.length; i++) {
            for (var key in arguments[i]) {
                if (obj.hasOwnProperty(key)) {
                    Grunt.log.warn('Warning duplicate object property -> ' + key);
                }
                if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
                    obj[key] = arguments[i][key];
                }
            }
        }
        return obj;
    };
    */

}());
