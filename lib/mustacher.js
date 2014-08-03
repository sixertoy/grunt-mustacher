'use strict';

var Mustacher,
    Path = require('path'),
    Grunt = require('grunt'),
    Handlebars = require('handlebars');

Mustacher = (function (_, Grunt) {

    var _instance,
        _defaults = {
            src: '',
            extension: '.hbs',
            dataExtension: '.json'
        };

    function Mustacher() {
        _instance = this;
    }

    Mustacher.prototype.init = function (helpers) {
        var name,
            helper,
            done = this.async();

        this.options(_defaults);

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
        var ouput,
            result,
            stream,
            template,
            taskIndex,
            taskConfig,
            jsonData = {},
            files = this.files,
            cwd = process.cwd(),
            done = this.async(),
            lf = Grunt.util.linefeed;

        setTimeout(function () {
            if (!files.length) {
                throw new Error('Config source files needed');
            } else {
                // file -> object
                files.forEach(function (task, index, config) {
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

                                stream = Grunt.file.read(filepath);
                                Grunt.file.setBase( Path.dirname( filepath ) );
                                template = _.compile(stream, {});
                                result = template(jsonData).trim();
                                Grunt.file.setBase( cwd );
                                return new _.SafeString(result);

                            })
                            .join(Grunt.util.normalizelf(Grunt.util.linefeed));
                        // Ecriture du fichier html
                        ouput = '';
                            ouput += content + lf;
                        Grunt.file.write(task.dest, ouput);
                        // Print a success message.
                        Grunt.log.ok('File "' + task.dest + '" created.');
                    }
                    done(true);
                });
            }
        }, 200);
    };

    return Mustacher;

})(Handlebars, Grunt);

module.exports = new Mustacher();
