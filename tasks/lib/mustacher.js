'use strict';

var Mustacher,
    Path = require('path'),
    Grunt = require('grunt'),
    Handlebars = require('handlebars');

var _utils = require('../lib/utils');

Mustacher = (function (_, Grunt) {

    var _name,
        _files,
        _instance,
        _options ={},
        _cwd = process.cwd(),
        _defaults_options = {
            src: '',
            dataExtension: '.json',
            partialsExtension:'.hbs'
        };

    function Mustacher() {
        _instance = this;
    }

    Mustacher.prototype.init = function (helpers) {
        var name,
            helper,
            done = this.async();

        _name = this.name;
        _files = this.files;
        _options = this.options(_defaults_options);

        setTimeout(function () {
            for (var i = 0; i < helpers.length; i++) {
                name = helpers[i];
                helper = require('../lib/helpers/' +name );
                helper.register();
            }
            done(true);
        }, 200);

    };

    Mustacher.prototype.render = function () {
        var func,
            dest,
            ouput,
            result,
            stream,
            taskIndex,
            taskConfig,
            context = {},
            // done = this.async(),
            lf = Grunt.util.linefeed,
            data = Handlebars.createFrame( _options || {} );

        setTimeout(function () {
            if (!_files.length) {
                throw new Error('Config source files needed');
            } else {
                // file -> object
                _files.forEach(function (task, index, config) {
                    taskIndex = index;
                    taskConfig = config;
                    if (!task.src.length) {
                        throw new Error('Config source files empty or non existent.');
                    } else {
                        var content = task.src
                            .filter(function (filepath) {
                                if (!Grunt.file.exists(filepath)) {
                                    Grunt.log.warn('Source file "' + filepath + '" not found.');
                                    return false;
                                } else {
                                    return true;
                                }
                            })
                            .map(function (filepath) {

                                // console.log( data );

                                stream = Grunt.file.read(filepath);
                                Grunt.file.setBase( Path.dirname( filepath ) );
                                func = _.compile(stream );
                                result = func( context, { data:data, hash:{} } );
                                result = _utils.removeEmptyChars( result );
                                Grunt.file.setBase( _cwd );
                                return new _.SafeString(result);

                            })
                            .join(Grunt.util.normalizelf(lf));

                        // Ecriture du fichier html
                        ouput = '';
                            ouput += content + lf;
                        var outputFile = task.dest;
                        Grunt.file.write(outputFile, ouput);
                        // Print a success message.
                        Grunt.log.ok('File "' + outputFile + '" created.');

                    }
                    // done(true);
                });
            }
        }, 200);
    };

    return Mustacher;

})(Handlebars, Grunt);

module.exports = new Mustacher();
