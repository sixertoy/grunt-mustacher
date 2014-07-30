/**

 http://handlebarsjs.com/block_helpers.html

*/
'use strict';

var MustacherEqualHelper,
    Handlebars = require('handlebars');

var _utils = require('../utils');

MustacherEqualHelper = (function (_) {

    function MustacherEqualHelper() {}

    MustacherEqualHelper.prototype.register = function () {
        var args,
            $this = this;
        _.registerHelper('equal', function () {
            args = _utils.arguments(arguments);
            return $this.compile.apply($this, args);
        });
    };

    MustacherEqualHelper.prototype.compile = function (lvalue, rvalue, options) {
        if (arguments.length < 3)
        {
            throw new Error('Handlebars Helper equal needs 2 parameters');
        }
        if (lvalue !== rvalue) {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    };

    return MustacherEqualHelper;

})(Handlebars);

module.exports = new MustacherEqualHelper();
