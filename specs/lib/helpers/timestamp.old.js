'use strict';

var MustacherUtils = require('../../../lib/utils'),
    MustacherTimestampHelper = require('../../../lib/helpers/timestamp');

exports.MustacherTimestampTest = {
    setUp: function (done) {
        this.utils = MustacherUtils;
        this.inst = MustacherTimestampHelper;
        return done();
    },
    // {{$timestamp}}
    compile: function (test) {
        var result,
            expected = 13,
            msg = 'MustacherTimestampTest.compile() test failed.';
        test.expect(2);
        //
        result = this.inst.compile();
        result = ( "" + result ).length;
        test.equal(result, expected, msg);
        //
        expected = true;
        result = this.inst.compile();
        result = this.utils.isNumber( result );
        test.equal(result, expected, msg);
        return test.done();
    }
};
