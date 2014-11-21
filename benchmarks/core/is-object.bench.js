/*jslint plusplus: true, indent: 4 */
/*global require, module, process */
(function () {
    'use strict';
    var cwd = process.cwd(),
        _ = require('lodash'),
        mock = {'0': 'toto', '1': [1, 2, 3], '2': null, '3': {toto: 'yo'}};

    // suite
    module.exports = {
        name: 'isObject',
        tests: {
            'native': function () {
                var result;
                if (typeof mock === 'object' && mock !== null) {
                    if (mock instanceof Object && Object.prototype.toString.call(mock) === '[object Object]') {
                        result = true;
                    }
                }
                return result;
            },
            'lodash': function () {
                return _.isPlainObject(mock);
            }
        }
    };

}());
