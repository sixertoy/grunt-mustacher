/*
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
'use strict';

module.exports = function (grunt) {

    var _utils = require('../lib/mustacher-utils'),
        _repeat = require('../lib/helpers/mustacher-repeat'),
        path = require('path'),
        handlebars = require('handlebars'),
        _defaults = {
            extension: '.hbs'
        };

    /*
        loremHelper = require('../lib/helpers/grunt-mustacher-lorem'),
        imagesHelper = require('../lib/helpers/grunt-mustacher-image'),
        randomHelper = require('../lib/helpers/grunt-mustacher-random'),
        repeatRepeat = require('../lib/helpers/grunt-mustacher-repeat'),
        includeHelper = require('../lib/helpers/grunt-mustacher-include'),
        util = require('util'),
        digits = require('digits'),
        lorem = require('lorem-ipsum'),
        handlebars = require('handlebars');
    */

    var toString = Object.prototype.toString;

    grunt.registerMultiTask('mustacher', 'Handlebars Template Helpers.', function () {
        // @TODO recuperation des arguments
        // console.log(arguments);

        var done = this.async();
        var mainOptions = this.options(_defaults);

        (function (_, grunt, $this) {
            // console.log( _repeat.compile );
            console.log( $this );
            _.registerHelper('repeat', function(){} );
        })(handlebars, grunt, this);

        /* --------------------------------------------------------------------------------------

 Task Rendering

-------------------------------------------------------------------------------------- */
        if (!this.files.length) {
            grunt.log.error('Config source files needed');
            return false;
        } else {
            // file -> object
            this.files.forEach(function (file, index, config) {
                if (!file.src.length) {
                    grunt.log.warn('Config source files empty or non existent.');
                    return false;
                } else {
                    var content = file.src
                        .filter(function (filepath) {
                            if (!grunt.file.exists(filepath)) {
                                grunt.log.warn('Source file "' + filepath + '" not found.');
                                return false;
                            } else {

                                var data = {},
                                    src = path.dirname(file.src),
                                    options = _utils.concat(mainOptions, file.options, {});

                                // console.log(file.hasOwnProperty('context'));

                                /*
                                if (file.hasOwnProperty('context')) {
                                    if (file.context !== "" && grunt.file.exists(file.context)) {
                                        // d = grunt.file.readJSON(file.context);
                                    } else {
                                        grunt.log.warn("Impossible de charger le fichier " + file.context);
                                    }
                                } else {
                                    var temp = path.dirname(filepath) + '/' + grunt_opts.data_src + path.basename(filepath).split(grunt_opts.extension).join(grunt_opts.data_ext);
                                    if (grunt.file.exists(temp)) {
                                        d = grunt.file.readJSON(temp);
                                    }
                                }
                                */

                                var stream = grunt.file.read(filepath);
                                var func = handlebars.compile(stream, {});
                                var result = new handlebars.SafeString(func(data));
                                return result;

                            }
                            return true;

                        })
                        .map(function (filepath) {
                            return grunt.file.read(filepath);
                        })
                        .join(grunt.util.normalizelf(grunt.util.linefeed));
                    // Ecriture du fichier html
                    content = '<!-- before -->\n' + content + '<!-- after -->\n';
                    grunt.file.write(file.dest, content);
                    // Print a success message.
                    grunt.log.ok('File "' + file.dest + '" created.');

                }
                return true;
            });
            /*
            // Recuperation du contenu du fichier
            var $this = this;
            this.files.forEach(function (f) {
                var dest_content = f.src.filter(function (filepath) {
                    if (!grunt.file.exists(filepath)) {
                        grunt.log.error('Source file "' + filepath + '" not found.');
                        return false;
                    } else {
                        return true;
                    }
                }).map(function (filepath) {

                    if( grunt_opts.partials == '' )
                        grunt_opts.partials = path.dirname(filepath);

                    var d = {};
                    // si un fichier de data json
                    // est sette dans la config gruntfile
                    if (f.hasOwnProperty('context')) {
                        if (f.context !== "" && grunt.file.exists(f.context)) {
                            d = grunt.file.readJSON(f.context);
                        } else {
                            grunt.log.error("Impossible de charger le fichier " + f.context);
                        }
                        // sinon on cherche un fichier
                        // au mm niveau que le fichier mustache
                        // ou si le data_src est sette dans le dossier
                    } else {
                        var temp = path.dirname(filepath) + '/' + grunt_opts.data_src + path.basename(filepath).split(grunt_opts.extension).join(grunt_opts.data_ext);
                        if (grunt.file.exists(temp)) {
                            d = grunt.file.readJSON(temp);
                        }
                    }

                    var stream = grunt.file.read(filepath);
                    var func = handlebars.compile( stream, {} );
                    var result = new handlebars.SafeString( func( d ) );
                    return result;
                })
                // Normalize les fins de lignes
                .join(grunt.util.normalizelf(grunt.util.linefeed));
                // Si le fichier existe deja
                // on le supprime
                if (grunt.file.exists(f.dest)) {
                    grunt.file.delete(f.dest);
                }

                // Ecriture du fichier html
                grunt.file.write(f.dest, dest_content);

                // Print a success message.
                grunt.log.ok('File "' + f.dest + '" created.');
                return true;
            });
            */
        }

    });

};
