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
        util = require('util'),
        digits = require('digits'),
        lorem = require('lorem-ipsum'),
        handlebars = require('handlebars');

    function _debug(context, msg) {
        console.log(context); // @TODO ajout du nom du template au message d'erreur
        grunt.log.debug('DEBUG :: ' + msg);
    }

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('mustacher', 'The best Grunt plugin ever.', function () {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            data_src: '',
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
                s = '<img src="' + base + '" alt="" title="" />';
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
            // @see http://jsfiddle.net/dain/NRjUb/
            _.registerHelper('$include', function (name, context) {
                var f, m,
                    d = name || {};
                if (arguments.length > 1) {

                    d = {};
                    d = _.createFrame(context.data);
                    d = _.Utils.extend(d, {
                        data: this
                    });
                    //                    console.log(d);

                    f = task.options().partials + name + '.mustache';
                    if (grunt.file.exists(f)) {
                        f = grunt.file.read(f);
                        f = _.compile(f);
                        return new _.SafeString(f(d));
                    } else {
                        m = "Template '" + name + "'not found in '" + task.options().partials + "'";
                        grunt.log.error(m);
                        return false;
                    }
                    //                    console.log(d);
                } else {
                    return false;
                }
            });

            /*
equals(
    template
    (
        {
            array:
            [
                {name: 'foo'},
                {name: 'bar'}
            ]
        },
        {
            helpers:
            {
                wycats: function(name, options)
                {
                    return name + ':' + options.data.contextPath + '\n';
                }
            }
        }
    ),
    'foo:array.0\nbar:array.1\n'
);
*/

            // Simple boucle permettant la repetition d'element
            // index est en argument
            // on accede
            _.registerHelper('repeat', function (context, options) {
                var i = 0,
                    r = '',
                    d = {},
                    c = '';
                if (arguments.length > 1) {

//                    console.log(options.data._parent);

                    if (options.data && options.ids) {
                        c = _.Utils.appendContextPath(options.data.contextPath, options.name) + '.';
                    }
                    context = util.format('%d', context);

                    if (options.data) {
                        var p = {
                            repeat: []
                        };
                        for (i = 0; i < context; i++) {
                            p.repeat.push({
                                count: i
                            });
                        }
                        var o = _.Utils.extend(options.data, p);
                        d = _.createFrame(o);
                    }
                    d.ids = ['repeat'];

                    for (i = 0; i < context; i++) {
                        d.count = i;
                        d.first = (i === 0);
                        d.last = (i === (context - 1));
                        if (c) {
                            d.contextPath = c + i;
                        }
//                        console.log(d);
                        r += options.fn(this, {
                            data: d
                        });
                    }
                    return r;
                } else {
                    //                    m = "Handlebars Repeat helper a besoin d'un argument type string";
                    //                    grunt.log.error(m);
                    //                    _debug(context, m);
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
                    var d = {};
                    var name = path.basename(filepath).split(options.extension).join('');
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
                        var temp = path.dirname(filepath) + '/' + options.data_src + path.basename(filepath)
                            .split(options.extension)
                            .join(options.data_ext);
                        if (grunt.file.exists(temp)) {
                            d = grunt.file.readJSON(temp);
                        }
                    }
//                    d.ids = [];
//                    d.ids.push( name);
//                    d.data = {};
//                    console.log(name);
//                    d.data.contextPath = name;
                    return new handlebars.SafeString(handlebars.compile(grunt.file.read(filepath), {
                        trackIds: true
                    })(d));
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
