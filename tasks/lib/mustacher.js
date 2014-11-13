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
        Lodash = require('lodash'),
        Handlebars = require('handlebars'),
        TaskUtils = require('./task-utils');

    /**
     * Variables
     */
    Defaults = {
        src: '',
        dataExtension: '.json',
        partialsExtension: '.hbs'
    };
    LF = Grunt.util.linefeed;

    Mustacher = function () {};

    /**
     *
     * Render template files
     *
     */
    Mustacher.prototype.render = function (task, helpers) {
        var file, content, html,
            context = {},
            deferred = Q.defer(),
            opts = task.options(Defaults),
            data = Handlebars.createFrame(opts || {});
        helpers.map(function (name) {
            var helper = require('./helpers/' + name);
            helper.register();
        });
        if (!task.files.length) {
            deferred.reject('Files argument is needed');
        } else {
            task.files.forEach(function (ptask, index, config) {
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
                    }).map(function (filepath, index) {
                        var stream = Grunt.file.read(filepath),
                            result = Handlebars.compile(stream)(context, {
                                data: data,
                                hash: {}
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
