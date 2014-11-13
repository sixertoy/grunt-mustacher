'use strict';

var MustacherUtils = require('../../../lib/utils'),
    MustacherLoremHelper = require('../../../lib/helpers/lorem');

exports.MustacherLoremTest = {
    setUp: function (done) {
        this.utils = MustacherUtils;
        this.inst = MustacherLoremHelper;
        return done();
    },
    // {{$lorem 10}}
    compile: function (test) {
        var result,
            expected = 10,
            msg = 'MustacherLoremHelper.compile(count) test failed.';
        test.expect(2);
        //
        result = this.inst.compile(10);
        result = result.split( " " ).length;
        test.equal(result, expected, msg);
        //
        expected = true;
        msg = 'MustacherLoremHelper.compile(isString) test failed.'
        result = this.inst.compile(10);
        result = this.utils.isString( result );
        test.equal(result, expected, msg);
        return test.done();
    }
};
