/**
 *
 * Check equality
 *
 * @author malas34 <malas34.github@gmail.com>
 * @see https://github.com/malas34/grunt-mustacher/tree/master/tests/lib/helpers/random_test.js
 * @version 1.0.0
 * @since 30 Jul 2014
 *

    The MIT License (MIT)

    Copyright (c) <year> <copyright holders>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
 */
'use strict';

var MustacherEqualHelper,
    Handlebars = require('handlebars');

var _utils = require('../utils');

MustacherEqualHelper = (function (_) {

    function MustacherEqualHelper() {}

    MustacherEqualHelper.prototype.register = function () {
        var args,
            $this = this;
        _.registerHelper('equal', function () {
            args = _utils.arguments(arguments);
            return $this.compile.apply($this, args);
        });
    };

    MustacherEqualHelper.prototype.compile = function (lvalue, rvalue, options) {
        var context = options || {};
        if (arguments.length < 3)
        {
            throw new Error('Handlebars Helper equal needs 2 parameters');
        }
        if (lvalue !== rvalue) {
            return context.inverse(this);
        } else {
            return context.fn(this);
        }
    };

    return MustacherEqualHelper;

})(Handlebars);

module.exports = new MustacherEqualHelper();
