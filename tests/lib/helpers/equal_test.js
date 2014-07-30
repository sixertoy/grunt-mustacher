'use strict';

var MustacherUtils = require('../../../lib/utils'),
    MustacherEqualHelper = require('../../../lib/helpers/equal');

exports.MustacherLoremTest = {
    setUp: function (done) {
        this.utils = MustacherUtils;
        this.inst = MustacherEqualHelper;
        return done();
    }
};
