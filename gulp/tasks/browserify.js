var gulp       = require('gulp');
var browserify = require('browserify');
var reactify   = require('reactify');
var source     = require('vinyl-source-stream');
var config     = require('../config');

// Browserify/bundle the JS.
gulp.task('browserify', function () {
    browserify(config.source + '/js/App.jsx')
        .transform(reactify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.dest + '/js'))
    ;
});