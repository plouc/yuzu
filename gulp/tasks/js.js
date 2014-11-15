var gulp       = require('gulp');
var browserify = require('browserify');
var reactify   = require('reactify');
var source     = require('vinyl-source-stream');
var notify     = require('gulp-notify');
var onError    = require('../util/handleErrors');
var config     = require('../config');
var _          = require('lodash');

// Browserify/bundle the JS.
gulp.task('js', _.map(config.groups, function (groupConfig, groupName) {

    var taskName = 'js:' + groupName;

    gulp.task(taskName, function () {
        browserify(groupConfig.src + '/js/' + groupConfig.js)
            .transform(reactify)
            .on('error', onError)
            .bundle()
            .on('error', onError)
            .pipe(source('yuzu.' + groupName + '.js'))
            .pipe(gulp.dest(groupConfig.dest + '/js'))
            .pipe(notify('js bundle generated for ' + groupName))
        ;
    });

    return taskName;
}));