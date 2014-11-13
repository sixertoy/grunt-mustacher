/*global process, require, define, describe, it, xit, expect, beforeEach, afterEach, afterLast, Class */
(function () {

    'use strict';

    var cwd = process.cwd(),
        Helper = require(cwd + '/tasks/lib/helpers/timestamp');

    describe('Timestamp helper', function () {

        describe('compile', function () {

            it ('should be sup to now', function(){
                var now = Date.now();
                var result = Helper.compile();
                expect(now < result).toBe(true);
            });

            it ('should be inf to now', function(){
                var result = Helper.compile();
                var now = Date.now();
                expect(now > result).toBe(true);
            });

        });

    });

}());
