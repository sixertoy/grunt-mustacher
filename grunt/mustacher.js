/*jslint indent: 4 */
/*global module */
module.exports = {
    compile: {
        files: [{
            src: 'examples/templates/commons/head.tpl',
            dest: 'examples/html/commons/head.html'
        }, {
            src: 'examples/templates/index.tpl',
            dest: 'examples/html/index.html'
        }]
    }
};
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
