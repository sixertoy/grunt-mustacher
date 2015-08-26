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
                inside: 'a template',
                and: 'at first level'
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
    
    exotic: {
        options: {
            delimiter: {
                ldim: '[*',
                rdim: '*]'
            }
        },
        files: {
            './spec/tmp/exotic.html': './spec/fixtures/exotic.tpl'
        }
    },
    all: {
        options: {
            delimiter: {
                ldim: '{{',
                rdim: '}}'
            },
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
            src: ['./spec/fixtures/**/*.tpl', '!./spec/fixtures/index.tpl', '!./spec/fixtures/page.tpl', '!./spec/fixtures/compact.tpl', '!./spec/fixtures/exotic.tpl']
        }]
    }
};
