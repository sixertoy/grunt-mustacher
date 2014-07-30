'use strict';

var MustacherUtils = require('../../../lib/utils'),
    MustacherRepeatHelper = require('../../../lib/helpers/repeat');

exports.MustacherRepeatTest = {
    setUp: function (done) {
        this.utils = MustacherUtils;
        this.inst = MustacherRepeatHelper;
        return done();
    },
    // {{#repeat 4}}{{/repeat}}
    compile: function (test) {
        var result,
            expected = true,
            msg = 'MustacherRepeatTest.compile() test failed.';
        test.expect(0);
        return test.done();
    }
};
