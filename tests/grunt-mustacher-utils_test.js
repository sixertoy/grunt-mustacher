'use strict';

var MustacherUtils = require('../lib/grunt-mustacher-utils');

exports.MustacherUtilsTest = {
    setUp: function (done) {
        this.utils = new MustacherUtils();
        return done();
    },
    isJSONContext: function (test) {
        test.expect(1);
        var result, expected;
        // ok
        expected = true;
        result = this.utils.isJSONContext('{"toto":"1"}');
        test.equal(result, expected, 'mustacherUtils.isJSONContext({"toto":"1"}) test failed.');
        // ok
        /*
        expected = true;
        result = this.utils.isJSONContext('{toto:0}');
        test.equal(result, expected, 'mustacherUtils.isJSONContext({toto:0}) test failed.');
        */
        // fail
        /*
        expected = false;
        result = this.utils.isJSONContext({});
        test.equal(result, expected, 'mustacherUtils.isJSONContext({}) test failed.');
        */
        // fail
        /*
        expected = false;
        result = this.utils.isJSONContext('{}');
        test.equal(result, expected, 'mustacherUtils.isJSONContext({}) test failed.');
        */
        return test.done();
    },
    isObject: function (test) {
        test.expect(6);
        var result, expected;
        // ok
        expected = true;
        result = this.utils.isObject({
            string: '1'
        });
        test.equal(result, expected, 'mustacherUtils.isObject(1) OK test failed.');
        // ok
        expected = true;
        result = this.utils.isObject({
            string: '1',
            arr: ['ok', [], 2],
            obj: {
                data: 1
            }
        });
        test.equal(result, expected, 'mustacherUtils.isObject(obj+array) OK test failed.');
        // ok
        expected = true;
        result = this.utils.isJSONContext('{toto:0}');
        test.equal(result, expected, 'mustacherUtils.isObject({toto:0}) FAIL test failed.');
        // fail
        expected = false;
        result = this.utils.isJSONContext(['fail', [], 0]);
        test.equal(result, expected, 'mustacherUtils.isObject([fail, [], 0]) FAIL test failed.');
        // fail
        expected = false;
        result = this.utils.isJSONContext('fail');
        test.notEqual(result, expected, 'mustacherUtils.isObject(fail) FAIL test failed.');
        // fail
        expected = false;
        result = this.utils.isJSONContext(5);
        test.equal(result, expected, 'mustacherUtils.isObject(5) FAIL test failed.');
        return test.done();
    }
};
