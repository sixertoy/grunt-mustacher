'use strict';

var MustacherUtils;

MustacherUtils = (function () {


    function MustacherUtils(){}

    MustacherUtils.prototype.isObject = function (obj) {
        var result;
        result = Object.prototype.toString.call(obj) === "[object Object]";
        return result;
    };

    MustacherUtils.prototype.isJSONContext = function (context) {
        var is_string, length, has_start, has_end, result;
        is_string = (typeof (context) === 'string');
        if (is_string) {
            length = context.length;
            has_start = (context.indexOf('{') === 0);
            has_end = (context.lastIndexOf('}') === (length - 1));
            if (has_start && has_end) {
                result = JSON.parse(context);
                // @TODO Fix this scope problems
                return true;
            }
        }
        return false;
    };

    MustacherUtils.prototype.parseContext = function (context) {
        /*
        if (isJSONContext(extras)) {
            var msg = "ERROR :: mustacher.parseJSONContext() :: L'argument attendu de type JSON";
            try {
                return (JSON.parse(extras));
            } catch (e) {
                throw new Error(msg);
            }
        }
        return extras;*/
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
