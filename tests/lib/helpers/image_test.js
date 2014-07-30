'use strict';

var MustacherUtils = require('../../../lib/utils'),
    MustacherImageHelper = require('../../../lib/helpers/image');

exports.MustacherLoremTest = {
    setUp: function (done) {
        this.utils = MustacherUtils;
        this.inst = MustacherImageHelper;
        return done();
    },
    // {{$image 300}}
    compile: function (test) {
        var result,
            expected = '<img src="http://placehold.it/300" alt="" title="" />',
            msg = 'MustacherImageHelper.compile(300) test failed.';
        test.expect(2);
        //
        result = this.inst.compile(300);
        test.equal(result, expected, msg);
        //
        msg = 'MustacherImageHelper.compile(400,300) test failed.'
        expected = '<img src="http://placehold.it/400x300" alt="" title="" />';
        result = this.inst.compile(400,300);
        test.equal(result, expected, msg);
        return test.done();
    }
};
