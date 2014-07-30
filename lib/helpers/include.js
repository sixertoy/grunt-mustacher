/**

 http://handlebarsjs.com/block_helpers.html

*/
'use strict';

var MustacherEqualHelper,
    Grunt = require('grunt'),
    Handlebars = require('handlebars');

var _utils = require('../utils');

MustacherIncludeHelper = (function (_, Grunt) {

    function MustacherIncludeHelper() {}


    MustacherIncludeHelper.prototype.register = function( options ){
        var $this = this;
        _.registerHelper('$include', function (options) {
            var args = _utils.arguments(arguments);
            var result = $this.compile.apply($this, args);
            return result;
        });
    };

    MustacherIncludeHelper.prototype.compile = function( file, options )
    {

        var d = {},
            context = {};
        if( arguments.length > 1 )
        {
            if( arguments.length > 2 )
            {
                d = _utils.concat( options, d );
                options =  arguments[ arguments.length - 1 ];
            }

            // d = _.createFrame( options.data );
            // var stream = grunt.file.read( file );

        }

        return false;
    };

    return MustacherIncludeHelper;

})(Handlebars, Grunt);

module.exports = new MustacherIncludeHelper();
