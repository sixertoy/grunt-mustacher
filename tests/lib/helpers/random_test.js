'use strict';

var MustacherUtils = require('../../../lib/utils'),
    MustacherHelperRandom = require('../../../lib/helpers/random');

exports.MustacherRandomTest = {
    setUp: function (done) {
        this.utils = MustacherUtils;
        this.inst = MustacherHelperRandom;
        this._nofloat = function (res) {
            return (('' + res).indexOf('.') < 0);
        };
        this._float = function (res) {
            return (('' + res).indexOf('.') !== -1);
        };
        return done();
    },
    // {{$random}}
    compileNoArguments: function (test) {
        var result,
            expected = true,
            msg = 'MustacherRandom.compile() test failed.';
        test.expect(2);
        // no arguments
        // return random max infinite no rounded
        result = this.inst.compile();
        result = this.utils.isNumber(result);
        test.equal(result, expected, msg);
        // no arguments, float test
        // return random max infinite no rounded
        msg += msg + ' :: is float';
        result = this.inst.compile();
        result = this.utils.isNumber(result) && this._float(result);
        test.equal(result, expected, msg);
        return test.done();
    },
    // {{$random false}}
    compileFalseArguments: function (test) {
        var result,
            expected = true,
            msg = 'MustacherRandom.compileFalseArguments(false) test failed.';
        test.expect(2);
        // no arguments
        // return random max infinite no rounded
        result = this.inst.compile(false);
        result = this.utils.isNumber(result);
        test.equal(result, expected, msg);
        // no arguments, float test
        // return random max infinite no rounded
        msg += msg + ' :: is float';
        result = this.inst.compile(false);
        result = this.utils.isNumber(result) && this._float(result);
        test.equal(result, expected, msg);
        return test.done();
    },
    // {{$random true}}
    compileTrueArguments: function (test) {
        var result,
            expected = true,
            msg = 'MustacherRandom.compileTrueArguments(true) test failed.';
        test.expect(2);
        // no arguments
        // return random max infinite no rounded
        result = this.inst.compile(true);
        result = this.utils.isNumber(result);
        test.equal(result, expected, msg);
        // no arguments, float test
        // return random max infinite no rounded
        msg += msg + ' :: no float';
        result = this.inst.compile(true);
        result = this.utils.isNumber(result) && this._nofloat(result);
        test.equal(result, expected, msg);
        return test.done();
    },
    // {{$random 10}}
    compileFirstArgNum: function (test) {
        var result,
            expected = true,
            msg = 'MustacherRandom.compileFirstArgNum(10) test failed.';
        test.expect(2);
        // no arguments
        // return random max infinite no rounded
        result = this.inst.compile(10);
        result = this.utils.isNumber(result) && result <= 10;
        test.equal(result, expected, msg);
        // no arguments, float test
        // return random max infinite no rounded
        msg += msg + ' :: is float';
        result = this.inst.compile(10);
        result = this.utils.isNumber(result) && result <= 10 && this._float(result);
        test.equal(result, expected, msg);
        return test.done();
    },
    // {{$random 5 10}}
    compileTwoArgsNum: function (test) {
        var result,
            expected = true,
            msg = 'MustacherRandom.compileTwoArgsNum(5,10) test failed.';
        test.expect(2);
        // no arguments
        // return random max infinite no rounded
        result = this.inst.compile(5, 10);
        result = this.utils.isNumber(result) && result >= 5 && result <= 10;
        test.equal(result, expected, msg);
        // no arguments, float test
        // return random max infinite no rounded
        msg += msg + ' :: is float';
        result = this.inst.compile(5, 10);
        result = this.utils.isNumber(result) && result >= 5 && result <= 10 && this._float(result);
        test.equal(result, expected, msg);
        return test.done();
    },
    // {{$random 0}}
    compileFirstArgZero: function (test) {
        var result,
            expected = true,
            msg = 'MustacherRandom.compileFirstArgZero(0) test failed.';
        test.expect(2);
        // no arguments
        // return random max infinite no rounded
        result = this.inst.compile(0);
        result = this.utils.isNumber(result) && result === 0;
        test.equal(result, expected, msg);
        // no arguments, float test
        // return random max infinite no rounded
        msg += msg + ' :: no float';
        result = this.inst.compile(0);
        result = this.utils.isNumber(result) && result === 0 && this._nofloat(result);
        test.equal(result, expected, msg);
        return test.done();
    },
    // {{$random true 0}}
    compileTwoArgsZeroFloor: function (test) {
        var result,
            expected = true,
            msg = 'MustacherRandom.compileFirstArgZero(true,0) test failed.';
        test.expect(2);
        // no arguments
        // return random max infinite no rounded
        result = this.inst.compile(true,0);
        result = this.utils.isNumber(result) && result === 0;
        test.equal(result, expected, msg);
        // no arguments, float test
        // return random max infinite no rounded
        msg += msg + ' :: no float';
        result = this.inst.compile(true,0);
        result = this.utils.isNumber(result) && result === 0 && this._nofloat(result);
        test.equal(result, expected, msg);
        return test.done();
    },
    // {{$random false 0}}
    compileTwoArgsZero: function (test) {
        var result,
            expected = true,
            msg = 'MustacherRandom.compileFirstArgZero(false,0) test failed.';
        test.expect(2);
        // no arguments
        // return random max infinite no rounded
        result = this.inst.compile(false,0);
        result = this.utils.isNumber(result) && result === 0;
        test.equal(result, expected, msg);
        // no arguments, float test
        // return random max infinite no rounded
        msg += msg + ' :: no float';
        result = this.inst.compile(false,0);
        result = this.utils.isNumber(result) && result === 0 && this._nofloat(result);
        test.equal(result, expected, msg);
        return test.done();
    },
    // {{$random true 5}}
    compileFirstArgFloor: function (test) {
        var result,
            expected = true,
            msg = 'MustacherRandom.compileFirstArgFloor(true,5) test failed.';
        test.expect(2);
        // no arguments
        // return random max infinite no rounded
        result = this.inst.compile(true, 5);
        result = this.utils.isNumber(result) && result <= 5;
        test.equal(result, expected, msg);
        // no arguments, float test
        // return random max infinite no rounded
        msg += msg + ' :: no float';
        result = this.inst.compile(true, 5);
        result = this.utils.isNumber(result) && result <= 5 && this._nofloat(result);
        test.equal(result, expected, msg);
        return test.done();
    },
    // {{$random false 5}}
    compileFirstArg: function (test) {
        var result,
            expected = true,
            msg = 'MustacherRandom.compileFirstArg(false,5) test failed.';
        test.expect(2);
        // no arguments
        // return random max infinite no rounded
        result = this.inst.compile(false, 5);
        result = this.utils.isNumber(result) && result <= 5;
        test.equal(result, expected, msg);
        // no arguments, float test
        // return random max infinite no rounded
        msg += msg + ' :: no float';
        result = this.inst.compile(false, 5);
        result = this.utils.isNumber(result) && result <= 5 && this._float(result);
        test.equal(result, expected, msg);
        return test.done();
    },
    // {{$random true 5 10}}
    compileThreeArgsFloor: function (test) {
        var result,
            expected = true,
            msg = 'MustacherRandom.compileThreeArgsFloor(true,5,10) test failed.';
        test.expect(2);
        // no arguments
        // return random max infinite no rounded
        result = this.inst.compile(true, 5, 10);
        result = this.utils.isNumber(result) && result >= 5 && result <= 10;
        test.equal(result, expected, msg);
        // no arguments, float test
        // return random max infinite no rounded
        msg += msg + ' :: no float';
        result = this.inst.compile(true, 5, 10);
        result = this.utils.isNumber(result) && result >= 5 && result <= 10 && this._nofloat(result);
        test.equal(result, expected, msg);
        return test.done();
    },
    // {{$random false 5 10}}
    compileThreeArgs: function (test) {
        var result,
            expected = true,
            msg = 'MustacherRandom.compileThreeArgs(false,5,10) test failed.';
        test.expect(2);
        // no arguments
        // return random max infinite no rounded
        result = this.inst.compile(false, 5, 10);
        result = this.utils.isNumber(result) && result >= 5 && result <= 10;
        test.equal(result, expected, msg);
        // no arguments, float test
        // return random max infinite no rounded
        msg += msg + ' :: no float';
        result = this.inst.compile(false, 5, 10);
        result = this.utils.isNumber(result) && result >= 5 && result <= 10 && this._float(result);
        test.equal(result, expected, msg);
        return test.done();
    }
};
