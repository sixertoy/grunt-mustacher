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

    var path = require('path'),
        util = require('util'),
        digits = require('digits'),
        lorem = require('lorem-ipsum'),
        handlebars = require('handlebars');

    var toString = Object.prototype.toString;


    function isJSONContext(context) {
        var length = context.length;
        return (
            (typeof (context) === 'string') && (context.indexOf('{') === 0) && (context.lastIndexOf('}') === (length - 1))
        );
    }

    function parseContext(extras) {
        if (isJSONContext(extras)) {
            var msg = "ERROR :: grunt-mustacher.parseJSONContext() :: L'argument attendu de type JSON";
            try {
                return (JSON.parse(extras));
            } catch (e) {
                throw new Error(msg);
            }
        }
        return extras;
    }

    function concat(obj /* ... sources */ ) {
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
        return obj;
    }

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('grunt-mustacher', 'Handlebars Template Helpers.', function () {

        var defaults = {
            data_src: '',
            data_ext: '.json',
            partials: undefined,
            // @TODO changement de l'extension
            // des partials/templates
            extension: '.hbs'
        };

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options(defaults);

        /* *******************************

 Handlebars Helpers

******************************* */
        (function (_, grunt, task, options) {

            var debug = grunt.log.debug;

            // on stocke la source des partials dans un array
            // pour optimisation
            _.partials = {};

            // Inclusion de partials de type handlebars
            // @see http://jsfiddle.net/dain/NRjUb/
            _.registerHelper('$include', function (context, extras, options) {
                var a, d, f, fn;

                if (arguments.length > 1) {

                    if (arguments.length <= 2) {
                        context = context;
                        options = extras;
                        extras = {};
                    }

                    extras = parseContext(extras);

                    if (
                        typeof context === 'string'
                    ) {

                        if (options.data) {
                            d = _.createFrame(options.data);
                        }

                        // pour les variables @ mettre a la racine d' l'objet
                        var abs = {
                            data: {name: context},
                            name: context
                        };
                        abs.data = concat(abs.data, extras);
                        abs = concat(abs, extras);

                        d = concat(d, task.options(), options, this, abs);

                        if (
                            (typeof _.partials[context] !== 'object') || !_.Utils.isFunction(_.partials[context].fn)
                        ) {
                            f = task.options().partials + context + task.options().extension;
                            if (!grunt.file.exists(f)) {
                                grunt.log.error("Unable to find source " + f);
                                return false;
                            } else {
                                fn = _.compile(grunt.file.read(f));
                                _.partials[context] = {};
                                _.partials[context].fn = fn;
                                _.partials[context].f = f;
                            }
                        } else {
                            f = _.partials[context].f;
                            fn = _.partials[context].fn;
                        }
                        // @TODO Evite les infinite loops
                        var after = "<!-- endof " + f + "-->";
                        var before = "<!-- " + f + "-->";
                        var output = fn(d).replace(/^\s+/, '').replace(/^\t+/, '');
                        output = (before + output + after);
                        return new _.SafeString(output);
                    } else {
                        // @TODO chargement des objects
                    }
                } else {
                    return false;
                }
            });

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
                if (!Date.now) return new Date().getTime();
                else return Date.now();
            });

            // Generate random number
            // if no min_max
            // generate random from 0 to 1 decimal
            _.registerHelper('$rand', function (context, options) {
                if (typeof context === 'string') {
                    context = context.split(':');
                    var first = parseFloat(context[0]);
                    var last = parseFloat(context[1]);
                    return Math.floor((Math.random() * (last - first)) + first);
                } else {
                    return Math.random();
                }
            });

            // Simple boucle permettant la repetition d'element
            // index est en argument
            // on accede
            _.registerHelper('repeat', function (context, extras, options) {
                var r = "",
                    d = {};

                if (arguments.length > 1) {

                    if (arguments.length <= 2) {
                        context = context;
                        options = extras;
                        extras = {};
                    }

                    extras = parseContext(extras);

                    if (_.Utils.isFunction(context)) {
                        context = context.call(this);
                    }

                    // pour les variables @ mettre a la racine d' l'objet
                    /*
                    var abs = { data: { name: context } };
                    abs.data = concat(abs.data, extras);
                    abs = concat(abs, extras);
                    */

//                    d = concat(d, task.options(), options, this, abs);

                    /*
                    if (typeof context === 'string') {} else {
                        // pour les variables @ mettre a la racine d' l'objet
                        //var abs = concat( {}, context.context, { data:context } );
                        var abs = {
                            data: context.context
                        };
                        abs.name = context.name;
                        abs = concat(abs, context.context);
                        abs.data = concat(abs.data, {
                            name: context.name
                        });
                        context = context.name;
                    }
                    */

                    if (options.data) {
                        d = _.createFrame(options.data);
                    }

                    var counts = [];
                    var length = parseFloat(context);
                    for (var j = 0; j < length; j++) {
                        var is_odd = (j % 2);
                        counts.push({
                            count: (j + 1),
                            odd: is_odd,
                            even: !is_odd
                        });
                    }
                    for (var i = 0; i < length; i++) {
                        if (d) {
                            d.index = i;
                            d.first = (i === 0);
                            d.last = (i === (length - 1));
                        }
                        r += options.fn(counts[i], {
                            data: d
                        });
                    }
                    return r;
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
                        var temp = path.dirname(filepath) + '/' + options.data_src + path.basename(filepath).split(options.extension).join(options.data_ext);
                        if (grunt.file.exists(temp)) {
                            d = grunt.file.readJSON(temp);
                        }
                    }
                    return new handlebars.SafeString(handlebars.compile(grunt.file.read(filepath), {})(d));
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
