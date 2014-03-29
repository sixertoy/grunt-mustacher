/*
 * Mustacher
 * https://github.com/malas34/mustacher
 *
 * Copyright (c) 2014 Matthieu Lassalvy
 * Licensed under the MIT license.
 *
 * HANDLEBARS
 * @see http://handlebarsjs.com/
 *
 * TWIG
 * @see https://github.com/adamdicarlo/grunt-twig/blob/master/tasks/twig.js
 *
 */

'use strict';

module.exports = function (grunt) {

    var path = require('path'),
        digits = require('digits'),
        lorem = require('lorem-ipsum'),
        handlebars = require('handlebars');

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('mustacher', 'The best Grunt plugin ever.', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            data_ext: '.json',
            partials: undefined,
            // @TODO changement de l'extension
            // des partials/templates
            extension: '.mustache'
        });

        /* *******************************

 Handlebars Helpers

******************************* */
        (function (_, grunt, task, options) {

            // on stocke la source des partials dans un array
            // pour optimisation
            _.partials = [];

            // Generate random lorem ipsum
            // @see https://www.npmjs.org/package/lorem-ipsum
            // @usage {{$lorem 'w:20'}}
            // Options
            //      w: words
            //      s: sentences
            //      p: paragraphs
            _.registerHelper('$lorem', function (config, context) {
                context = context || {};
                var s = config.split(':');
                if (s.length) {
                    var u = s[0];
                    return new _.SafeString(lorem({
                        count: parseFloat(s[1]),
                        units: (u === 'p') ? 'paragraphs' : ((u === 's') ? "sentences" : "words")
                    }));
                } else {
                    // @TODO
                    return false;
                }
            });

            // Generate a dummy image
            // @see http://placehold.it
            _.registerHelper('$dummy', function (config, context) {
                context = context || {};
                var s = '',
                    base = 'http://placehold.it';
                // si pas de config
                if (config.length) {
                    config = config.split(':');
                    for (var i = 0; i < config.length; i++) {
                        if (i < (config.length - 1) || (i === 0)) {
                            base += '/' + config[i];
                        } else {
                            base += '&text=' + config[i];
                        }
                    }
                } else {
                    // taille par defaut
                    base += '/300';
                }
                s = '<img src="' + base + '" alt="" title=""/>';
                return new _.SafeString(s);
            });

            // Generate a timestamp
            _.registerHelper('$timestamp', function (context) {
                context = context || {};
                if (!Date.now) {
                    return new Date().getTime();
                } else {
                    return Date.now();
                }
            });

            // Generate random number
            // if no min_max
            // generate random from 0 to 1 decimal
            _.registerHelper('$rand', function (min_max, context) {
                context = context || {};
                if (min_max.length) {
                    var s = min_max.split('+');
                    s.push(0);
                    var f = parseFloat(s[0]);
                    var t = parseFloat(s[1]);
                    if (!isNaN(f) && !isNaN(t)) {
                        return Math.floor((Math.random() * (t - f) + f));
                    } else {
                        // @TODO add log error
                        return false;
                    }
                } else {
                    return Math.random();
                }
            });

            // Inclusion de partials de type handlebars
            _.registerHelper('$include', function (name, context) {
                context = context || {};
                if (name.length) {
                    var d = {},
                        projectpath = path.resolve();

                    // console.log(name+'::');
                    // console.log(context.data);

                    if (context.data) {
                       d = _.createFrame(context.data.root || {});
                    }
                    var options = task.options();
                    // @TODO extension des templates parametrables
                    var file = options.partials + name + '.mustache';

                    if (grunt.file.exists(file)) {

                        var source = grunt.file.read(file);
                        var template = _.compile(source);
                        // var html = template.fn(this, { data: d });
                        var html = template(d);
//                        var html = template(d);
                        // console.log(context);
                        // context.fn(template,{data:d});
                        // console.log(context);
                        return new _.SafeString(html);

                    }
                } else {
                    return false;
                }
            });

            // Simple boucle permettant la repetition d'element
            // index est en argument
            _.registerHelper('repeat', function (count, context) {
                context = context || {};
                if (count.length) {
                    var r = '',
                        d = {},
                        c = parseFloat(count);
                    if (context.data) {
                        d = _.createFrame(context.data);
                    }
                    for (var i = 0; i < c; i++) {
                        d = {
                            index: i
                        };
                        r += context.fn(this, {
                            data: d
                        }).trim() + grunt.util.linefeed;
                    }
                    // @TODO format end line
                    return new _.SafeString(r.trim());
                } else {
                    return false;
                }
            });

        })(handlebars, grunt, this);


        /* *******************************

 Task Rendering

******************************* */
        // Iteration sur toutes les "Files"
        // les sous taches de la taches mytask:{ dev:{},prod:{}}.
        // l'API Grunt supprime les fichiers manquant dans la Gruntfile.js
        // Elles ne sont donc pas disponibles dans la boucle
        if (!this.filesSrc.length) {
            grunt.log.error('Source file needed.');
            return false;
        } else {
            // Recuperation du contenu du fichier
            this.files.forEach(function (f) {
                var dest_content = f.src.filter(function (filepath) {
                    if (!grunt.file.exists(filepath)) {
                        grunt.log.error('Source file "' + filepath + '" not found.');
                        return false;
                    } else {
                        return true;
                    }
                }).map(function (filepath) {
                    var json = "",
                        context = {};
                    if (f.hasOwnProperty('context')) {
                        json = f.context.trim();
                        if (json !== "") {
                            context = grunt.file.readJSON(json);
                        }
                    } else {
                        var ext = path.extname(filepath);
                        //                var dir = path.dirname(filepath);
                        //                var fname = path.basename(filepath, ext);
                        json = filepath.split(ext).join(".json");
                        // Chargement du fichier JSON correspondant
                        // Au fichier .mustache actuel
                        if (grunt.file.exists(json)) {
                            context = grunt.file.readJSON(json);
                        }

                    }
                    var source = grunt.file.read(filepath);
                    var template = handlebars.compile(source);
                    var html = template(context);
                    return html;
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
        }
    });

};
