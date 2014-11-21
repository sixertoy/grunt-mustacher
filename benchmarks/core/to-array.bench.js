/*jslint plusplus: true, indent: 4 */
/*global require, module, process */
(function () {
    'use strict';
    var cwd = process.cwd(),
        _lodash = require('lodash'),
        _underscore = require('underscore'),
        mock = {'0': 'toto', '1': [1, 2, 3], '2': null, '3': {toto: 'yo'}};

    // suite
    module.exports = {
        name: 'toArray',
        tests: {
            'native': function () {
                var index = -1,
                    keys = Object.keys(mock),
                    length = keys.length,
                    result = Array(length);
                while(++index < length){
                    result[index] = mock[keys[index]];
                }
                return result;
            },
            'prototype': function () {
                return Array.prototype.slice.call(mock);
            },
            'lodash': function () {
                return _lodash.toArray(mock);
            },
            'underscore': function () {
                return _underscore.toArray(mock);
            }
        }
    };

}());
