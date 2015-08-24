/*jslint indent: 4 */
/*global module */
module.exports = {
    compact: {
        files: {
            './spec/tmp/compact.html': './spec/fixtures/compact.tpl'
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
            src: './spec/fixtures/index.tpl',
            dest: './spec/tmp/index.html'
        }, {
            src: './spec/fixtures/page.tpl',
            dest: './spec/tmp/page.html'
        }]
    },
    all: {
        options: {
            partials: {
                src: './spec/fixtures/partials/'
            },
            context: {
                inside: 'a template'
            }
        },
        files: [{
            cwd: '.',
            ext: '.html',
            expand: true,
            flatten: true,
            filter: 'isFile',
            dest: './spec/tmp/',
            src: ['./spec/fixtures/**/*.tpl', '!./spec/fixtures/index.tpl', '!./spec/fixtures/page.tpl', '!./spec/fixtures/compact.tpl']
        }]
    }
};
