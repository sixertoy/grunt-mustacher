'use strict';

var MustacherUtils,
    Grunt = require('grunt');

MustacherUtils = (function (Grunt) {

    function MustacherUtils() {}

    // @TODO unittest
    MustacherUtils.prototype.isFunction = function (func) {
        return Grunt.util.kindOf(func) == 'function';
    };

    // @TODO unittest
    MustacherUtils.prototype.isBoolean = function (bool) {
        return Grunt.util.kindOf(bool) == 'boolean';
    };

    // @TODO unittest
    MustacherUtils.prototype.isArray = function (arr) {
        return Grunt.util.kindOf(arr) == 'array';
    };

    // @TODO unittest
    MustacherUtils.prototype.isNumber = function (num) {
        return Grunt.util.kindOf(num) == 'number';
    };

    // @TODO unittest
    MustacherUtils.prototype.isString = function (str) {
        return Grunt.util.kindOf(str) == 'string';
    };

    // @TODO unittest
    MustacherUtils.prototype.isObject = function (obj) {
        return Grunt.util.kindOf(obj) == 'object';
    };

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

    // @TODO Tests Unitaires
    MustacherUtils.prototype.arguments = function(args)
    {
        return Array.prototype.slice.call(args);
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

    return MustacherUtils;

})(Grunt);

module.exports = new MustacherUtils();
