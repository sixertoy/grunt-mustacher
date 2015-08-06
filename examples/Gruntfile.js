module.exports = function (grunt) {

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
                files: [{
                    src: 'src/index.tpl',
                    dest: 'html/index.html'
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
                    base: 'html/'
                }
            }
        },
        watch: {
            options: {
                livereload: 1337
            },
            html: {
                files: ['./src/*.tpl', './src/**/*.hbs'],
                tasks: ['mustacher']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-mustacher');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('serve', ['mustacher', 'connect:server', 'watch']);
    grunt.registerTask('default', ['serve']);

};