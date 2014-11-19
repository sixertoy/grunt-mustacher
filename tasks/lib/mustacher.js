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
/*jshint unused: false */
/*jslint plusplus: true, indent: 4 */
/*global module, require, process */
(function () {

    'use strict';

    /**
     * Imports
     */
    var Mustacher, LF, Defaults,
        Q = require('q'),
        Path = require('path'),
        Grunt = require('grunt'),
        LoDash = require('lodash'),
        Handlebars = require('handlebars'),
        TaskUtils = require('./task-utils');

    /**
     * Variables
     * @see http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
     */
    /*
    all: {
        options:{
            partials: 'examples/partials/'
        },
        files: [{
            expand: true,
            cwd: 'examples/templates/', // relative src path
            src: '*.tpl',
            dest: 'examples/html',
            ext: '.html', // compiled file extension
            extDot: 'first', // Extensions in filenames begin after the first dot
            flatten: true // Remove all path parts from generated dest paths.
        }]
    },
    */
    Defaults = {
        cwd: '',
        src: null,
        dest: null,
        ext: '.hbs',
        expand: false,
        flatten: false,
        extDot: 'first',
        //
        contexts: null,
        partials: null,
    };
    LF = Grunt.util.linefeed;

    Mustacher = function () {};

    /**
     *
     * Render template files
     *
     */
    Mustacher.prototype.render = function (task, helpers) {
        var opts, file, content, html, data,
            context = {},
            deferred = Q.defer();

        /*
        var requires = this.requiresConfig('mysqldumper.local', 'mysqldumper.local.database', 'mysqldumper.distant', 'mysqldumper.distant.database', 'mysqldumper.distant.host');
        if(!requires){}
        */

        opts = task.options(Defaults);

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
                            template = Handlebars.compile(stream, {
                                trackIds: false
                            }),
                            // rendu du contenu
                            result = template(context, {
                                data: Handlebars.createFrame({
                                    root: opts
                                })
                            });
                        result = TaskUtils.removeEmptyChars(result);
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
