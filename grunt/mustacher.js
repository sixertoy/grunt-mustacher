/*jslint indent: 4 */
/*global module */
module.exports = {
    compile: {
        files: [{
            src: 'templates/commons/head.tpl',
            dest: 'html/commons/head.html'
                    }, {
            src: 'templates/index.tpl',
            dest: 'html/index.html'
                    }]
    }
    /*
                templates: {
                    files: [{
                        expand: true,
                        cwd: 'output/hbs/commons/',
                        src: '.hbs',
                        dest: 'output/tpl/commons/',
                        ext: '.tpl'
                }]
                },

                html: {
                    files: [{
                        expand: true,
                        cwd: 'html/tpl/',
                        src: '*.tpl',
                        dest: 'html/html/',
                        ext: '.html'
                }]
                }
                */
};
