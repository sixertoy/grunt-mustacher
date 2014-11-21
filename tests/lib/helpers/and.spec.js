/*jslint indent: 4 */
/*jshint unused: false */
/*global jasmine, process, require, define, describe, it, xit, expect, beforeEach, afterEach, afterLast, Class */
(function () {

    'use strict';

    var result, helper,
        cwd = process.cwd(),
        Helper = require(cwd + '/tasks/lib/helpers/and'),
        options = require(cwd + '/tests/fixtures/options');

    describe('And helper', function () {

        beforeEach(function(){
            helper = new Helper();
            helper.register();
        });

        if('should throw', function(){
            expect(function(){
                result = helper.render();
            }).toThrow();
            expect(function(){
                result = helper.render(options);
            }).toThrow();
            expect(function(){
                result = helper.render(true, options);
            }).toThrow();
        });

        afterEach(function(){
            helper = null;
        });

    });

}());
