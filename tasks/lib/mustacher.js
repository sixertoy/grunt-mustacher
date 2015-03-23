/**
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
/*jslint plusplus: true, indent: 4 */
/*global module, require, process */
(function () {

    'use strict';

    /**
     * Imports
     */
    var Mustacher, LF, defaultsOptions,
        Q = require('q'),
        Grunt = require('grunt'),
        LoDash = require('lodash'),
        Handlebars = require('handlebars');

    /**
     * Variables
     * @see http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
     */

    defaultsOptions = {
        src: null,
        dest: null,
        ext: '.html', // output/compiled file extension
        expand: false,
        flatten: false, // Remove all path parts from generated dest paths.
        extDot: 'first', // Extensions in filenames begin after the first dot
        cwd: process.cwd(), // relative path to src
        delimiter: {
            ldim: '{{',
            rdim: '}}'
        },
        //
        partials: {
            depth: 2,
            ext: '.hbs',
            src: 'partials/'
        }
    };
    LF = Grunt.util.linefeed;

    Mustacher = function () {};

    /**
     *
     * Render template files
     *
     */
    Mustacher.prototype.render = function (task, helpers) {
        var file, content, html, data,
            context = {},
            deferred = Q.defer();

        /*
        var requires = this.requiresConfig('mysqldumper.local', 'mysqldumper.local.database', 'mysqldumper.distant', 'mysqldumper.distant.database', 'mysqldumper.distant.host');
        if(!requires){}
        */

        LoDash.merge(defaultsOptions, task.options());
        data = {root: defaultsOptions }; // explicit root for handlebars compile
        data = Handlebars.createFrame(data);

        helpers.map(function (name) {
            var Helper = require('./helpers/' + name),
                instance = new Helper();
            instance.register();
        });
        if (!task.files.length) {
            deferred.reject('Files argument is needed');
        } else {
            task.files.forEach(function (ptask) {
                if (!ptask.src.length) {
                    deferred.reject('No Mustache files parse to parse');
                } else {
                    content = ptask.src.filter(function (filepath) {
                        if (!Grunt.file.exists(filepath)) {
                            Grunt.log.warn('Source file not found: ' + filepath);
                            return false;
                        } else {
                            return filepath;
                        }
                    }).map(function (filepath) {
                        // @TODO
                        // opts may contains output path
                        // for includes
                        var stream = Grunt.file.read(filepath),
                            // compilation du contenu
                            template = Handlebars.compile(stream, {trackIds: false}), // handlebars compile options
                            // rendu du contenu
                            result = template(context, {data: data}); // pass root context to helpers
                        result = result.trim();
                        Grunt.file.setBase(process.cwd());
                        return new Handlebars.SafeString(result);
                    }).join(Grunt.util.normalizelf(LF));
                    // Ecriture du fichier html
                    file = ptask.dest;
                    html = content + LF;
                    Grunt.file.write(file, html);
                    Grunt.log.ok('File "' + file + '" created.');
                    deferred.resolve(true);
                }
            });
        }
        return deferred.promise;
    };

    module.exports = Mustacher;

}());
