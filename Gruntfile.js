/*jslint indent: 4 */
/*globals require, module */
module.exports = function (grunt) {

    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /* ******************************************************************
         *
         * Mustacher task
         *
         */
        mustacher: {
            options: {
                partials: {
                    src: 'src/'
                }
            },
            compile: {
                options: {
                    context: {
                        any: 'to be touched by @root.context.any',
                        inside: 'a template'
                    }
                },
                files: [{
                    src: 'src/index.tpl',
                    dest: 'html/index.html'
                }]
            },
            src_to_dest: {
                files: {
                    "html/src_to_dest.html": "src/src_to_dest.tpl"
                }
            },
            all: {
                files: [{
                    ext: ".html",
                    expand: true,
                    flatten: true,
                    src: "./all_task/*.tpl",
                    dest: "./html/all_task/"
                }]
            }
        },
        /*
         *
         * endof Mustacher task
         *
         * ***************************************************************** */
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: "html/"
                }
            }
        },
        watch: {
            options: {
                livereload: 1337
            },
            html: {
                files: ["./src/*.tpl", "./src/**/*.hbs"],
                tasks: ["mustacher"]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks("grunt-mustacher");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-connect");

    // Default task(s).
    grunt.registerTask("serve", ["mustacher:compile", "mustacher:src_to_dest", "mustacher:all", "connect:server", "watch"]);
    grunt.registerTask("default", ["serve"]);

};
