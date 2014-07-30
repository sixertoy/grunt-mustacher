/**
 *
 * Generate Dummy image from placehold.it
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

var MustacherImageHelper,
    Handlebars = require('handlebars');

var _utils = require('../utils');

MustacherImageHelper = (function (_) {

    function MustacherImageHelper() {}

    MustacherImageHelper.prototype.register = function () {
        var args,
            $this = this;
        _.registerHelper('$image', function () {
            args = _utils.arguments(arguments);
            return $this.compile.apply($this, args);
        });
    };
    /**
     * @TODO ajout d'un string comme arg pour parametrage custom
     * @see htt://placehold.it
     */
    MustacherImageHelper.prototype.compile = function (width, height, options) {
        var result = '',
            context = options || {};
        if (_utils.isNumber( width ) ) {
            if (_utils.isNumber( height)) {
                result = 'http://placehold.it/' + width + 'x' + height;
            } else {
                result = 'http://placehold.it/' + width;
            }
            result = '<img src="' + result + '" alt="" title="" />';
            result = new _.SafeString(result);
            return result;
        } else {
            throw new Error('MustacherImageHelper width argument is missing');
        }
    };

    return MustacherImageHelper;

})(Handlebars);

module.exports = new MustacherImageHelper();
