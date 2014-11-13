'use strict';

var MustacherUtils = require('../../../lib/utils'),
    MustacherEqualHelper = require('../../../lib/helpers/equal');

exports.MustacherEqualTest = {
    setUp: function (done) {
        this.utils = MustacherUtils;
        this.inst = MustacherEqualHelper;
        return done();
    }
};
