'use strict';

var MustacherUtils;

MustacherUtils = (function () {


    function MustacherUtils() {}

    MustacherUtils.prototype.isString = function (str) {
        return (typeof (str) === 'string');
    };

    MustacherUtils.prototype.isObject = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    };

    MustacherUtils.prototype.isEmpty = function (obj) {
        if (this.isObject(obj)) {
            return !(Object.keys(obj).length > 0);
        } else if (typeof (obj) === 'string') {
            return !(obj.trim().length > 0);
        } else if (typeof (obj) === 'number') {
            return (obj === 0);
        } else if (typeof (obj) === 'object' && obj.hasOwnProperty('length')) {
            return !(obj.length > 0);
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
                    return false;
                }
            }
        }
        return false;
    };

    MustacherUtils.prototype.parseContext = function (context) {
        if (this.isJSONContext(context)) {
            var msg = "ERROR :: mustacher.parseJSONContext() :: L'argument attendu de type JSON";
            try {
                return (JSON.parse(context));
            } catch (e) {
                throw new Error(msg);
            }
        }
        return context;
    };

    MustacherUtils.prototype.concat = function (context) {
        /*
            obj * ... sources * ) {
        for (var i = 1; i < arguments.length; i++) {
            for (var key in arguments[i]) {
                if (obj.hasOwnProperty(key)) {
                    grunt.log.debug("Warning duplicate object property -> " + key);
                }
                if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
                    obj[key] = arguments[i][key];
                }
            }
        }
        */
    };

    return MustacherUtils;

})();

module.exports = MustacherUtils;
