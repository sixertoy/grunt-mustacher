/**
 *
 * Install Locals Dev
 * npm install gulp gulp-jshint jshint-stylish --save-dev
 *
 */
/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module */
(function () {

    'use strict';

    var // variables
        // requires
        gulp = require('gulp'),
        bump = require('gulp-bump');

    gulp.task('bump', function () {
        gulp.src('./package.json')
            .pipe(bump())
            .pipe(gulp.dest('./'));
    });

    gulp.task('default', ['bump']);

}());
