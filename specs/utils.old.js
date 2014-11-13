'use strict';

var MustacherUtils = require('../lib/utils');

exports.MustacherUtilsTest = {
    setUp: function (done) {
        this.utils = new MustacherUtils();
        return done();
    },
    /*
    concat: function (test) {
    },
    */
    isJSONContext: function (test) {
        test.expect(5);
        var expected;
        expected = true;
        // ok
        test.equal(this.utils.isJSONContext('{"toto":"1"}'), expected, 'mustacherUtils.isJSONContext({"toto":"1"}) test failed.');
        // ok
        test.equal(this.utils.isJSONContext('{"toto":0}'), expected, 'mustacherUtils.isJSONContext({"toto":0}) test failed.');
        // false
        test.notEqual(this.utils.isJSONContext('{toto:0}'), expected, 'mustacherUtils.isJSONContext({toto:0}) test failed.');
        // fail
        test.notEqual(this.utils.isJSONContext({}), expected, 'mustacherUtils.isJSONContext({}) test failed.');
        // fail
        test.notEqual(this.utils.isJSONContext('{}'), expected, 'mustacherUtils.isJSONContext({}) test failed.');
        return test.done();
    },
    isObject: function (test) {
        test.expect(6);
        var expected;
        // ok
        expected = true;
        test.equal(this.utils.isObject({
            string: 'hello world!'
        }), expected, 'mustacherUtils.isObject(1) OK test failed.');
        // ok
        test.equal(this.utils.isObject({
            string: 'hello world!',
            arr: ['hello world!', [], 2],
            obj: {
                data: 1
            }
        }), expected, 'mustacherUtils.isObject(obj+array) OK test failed.');
        // fail
        test.notEqual(this.utils.isObject('{data:0}'), expected, 'mustacherUtils.isObject({data:0}) FAIL test failed.');
        // fail
        test.notEqual(this.utils.isObject(['fail', [], 0]), expected, 'mustacherUtils.isObject([fail, [], 0]) FAIL test failed.');
        // fail
        test.notEqual(this.utils.isObject('fail'), expected, 'mustacherUtils.isObject(fail) FAIL test failed.');
        // fail
        test.notEqual(this.utils.isObject(5), expected, 'mustacherUtils.isObject(5) FAIL test failed.');
        return test.done();
    },
    isString: function (test) {
        test.expect(6);
        var expected;
        // ok
        expected = true;
        test.equal(this.utils.isString('hello world!'), expected, 'mustacherUtils.isObject("hello world!") OK test failed.');
        // ok
        test.equal(this.utils.isString(''), expected, 'mustacherUtils.isObject("") OK test failed.');
        // fail
        test.notEqual(this.utils.isString({}), expected, 'mustacherUtils.isObject({}) OK test failed.');
        // fail
        test.notEqual(this.utils.isString([]), expected, 'mustacherUtils.isObject([]) OK test failed.');
        // fail
        test.notEqual(this.utils.isString(3), expected, 'mustacherUtils.isObject(3) OK test failed.');
        // ok
        test.equal(this.utils.isString(3 + ''), expected, 'mustacherUtils.isObject(3+"") OK test failed.');
        return test.done();
    },
    isEmpty: function (test) {
        test.expect(12);
        var expected;
        expected = true;
        // ok
        test.equal(this.utils.isEmpty({}), expected, 'mustacherUtils.isEmpty({}) OK test failed.');
        // fail
        test.notEqual(this.utils.isEmpty({
            data: 'hello world!'
        }), expected, 'mustacherUtils.isEmpty({data:"hello world!"}) OK test failed.');
        // ok
        test.equal(this.utils.isEmpty(''), expected, 'mustacherUtils.isEmpty("") OK test failed.');
        // fail
        test.notEqual(this.utils.isEmpty('lorem ipsum dolor sit amet'), expected, 'mustacherUtils.isEmpty("lorem ipsum dolor sit amet") OK test failed.');
        // fail
        test.equal(this.utils.isEmpty('   '), expected, 'mustacherUtils.isEmpty("   ") OK test failed.');
        // fail
        test.notEqual(this.utils.isEmpty(' lorem '), expected, 'mustacherUtils.isEmpty(" lorem ") OK test failed.');
        // ok
        test.equal(this.utils.isEmpty(0), expected, 'mustacherUtils.isEmpty(0) OK test failed.');
        // fail
        test.notEqual(this.utils.isEmpty(10), expected, 'mustacherUtils.isEmpty(10) OK test failed.');
        // fail
        test.notEqual(this.utils.isEmpty(-10), expected, 'mustacherUtils.isEmpty(-10) OK test failed.');
        // fail
        test.notEqual(this.utils.isEmpty(-10.45), expected, 'mustacherUtils.isEmpty(-10.45) OK test failed.');
        // ok
        test.equal(this.utils.isEmpty([]), expected, 'mustacherUtils.isEmpty([]) OK test failed.');
        // fail
        test.notEqual(this.utils.isEmpty([1, 2, 3]), expected, 'mustacherUtils.isEmpty([1,2,3]) OK test failed.');
        return test.done();
    }
};
