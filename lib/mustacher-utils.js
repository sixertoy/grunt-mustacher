'use strict';

var MustacherUtils;
var grunt = require('grunt');

MustacherUtils = (function (grunt) {


    function MustacherUtils() {}

    MustacherUtils.prototype.isString = function (str) {
        return (typeof (str) === 'string');
    };

    MustacherUtils.prototype.isObject = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
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
                    grunt.log.error('ERROR :: mustacher.parseJSONContext() :: context must be a JSON type');
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
                grunt.log.error('MustacherUtils.parseJSONContext() :: context must be a JSON type');
                return false;
            }
        }
        return context;
    };

    MustacherUtils.prototype.concat = function () {
        var obj = [];
        for (var i = 0; i < arguments.length; i++) {
            for (var key in arguments[i]) {
                if (obj.hasOwnProperty(key)) {
                    grunt.log.warn('Warning duplicate object property -> ' + key);
                }
                if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
                    obj[key] = arguments[i][key];
                }
            }
        }
        return obj;
    };

    return MustacherUtils;

})(grunt);

module.exports = new MustacherUtils();
