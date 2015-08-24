/*jslint indent: 4 */
/*global module */
module.exports = {
    options: {
        partials: {
            src: 'src/'
        }
    },
    compact: {
        files: {
            'spec/tmp/compact.html': 'spec/fixtures/compact.tpl'
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
            src: 'spec/fixtures/index.tpl',
            dest: 'spec/tmp/index.html'
        }, {
            src: 'spec/fixtures/page.tpl',
            dest: 'spec/tmp/page.html'
        }]
    }
};
