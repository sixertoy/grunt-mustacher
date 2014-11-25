/*jslint indent: 4 */
/*global module, grunt, console */
module.exports = function (grunt, options) {
    return {
        target: {
            options: {
                questions: [{
                    type: 'list',
                    message: 'Type',
                    config: 'bump.type',
                    choices: [
                        'feat',
                        'fix',
                        'docs',
                        'style',
                        'refactor',
                        'test',
                        'chore'
                    ]
                }, {
                    type: 'input',
                    message: 'Scope',
                    config: 'bump.scope',
                    default: false, // jshint ignore:line
                    /*jshint ignore:start */
                    validate: function (value) {
                        return grunt.util.kindOf(value) === 'string';
                    }
                    /*jshint ignore:end */
                }, {
                    type: 'input',
                    message: 'Subject',
                    config: 'bump.subject',
                    default: false, // jshint ignore:line
                    /*jshint ignore:start */
                    validate: function (value) {
                        return grunt.util.kindOf(value) === 'string';
                    }
                    /*jshint ignore:end */
                }], then: function(results, done){
                    options.bump = {
                        type: results['bump.type'],
                        scope: results['bump.scope'],
                        subject: results['bump.subject']
                    };
                    done();
                }
            }
        }
    };
};
