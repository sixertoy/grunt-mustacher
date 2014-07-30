/**

 http://handlebarsjs.com/block_helpers.html

*/
'use strict';

var MustacherHelperLorem,
    Lorem = require('lorem-ipsum'),
    Handlebars = require('handlebars');

var _utils = require('../utils');

MustacherHelperLorem = (function (_, Lorem) {

    function MustacherHelperLorem() {}

    MustacherHelperLorem.prototype.register = function () {
        var args,
            $this = this;
        _.registerHelper('$lorem', function () {
            args = _utils.arguments(arguments);
            return $this.compile.apply($this, args);
        });
    };

    MustacherHelperLorem.prototype.compile = function (count, options) {
        var result = '',
            context = options || {};
        if (!arguments.length ) {
            throw new Error('MustacherHelperLorem needs 1 argument');
        }
        result = Lorem({
            count: count,
            units: 'words'
        });
        result = new _.SafeString(result);
        return result.string;
    };

    return MustacherHelperLorem;

})(Handlebars, Lorem);

module.exports = new MustacherHelperLorem();
