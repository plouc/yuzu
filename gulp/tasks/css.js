var gulp    = require('gulp');
var sass    = require('gulp-ruby-sass');
var cssmin  = require('gulp-cssmin');
var rename  = require('gulp-rename');
var concat  = require('gulp-concat');
var config  = require('../config');
var notify  = require('gulp-notify');
var onError = require('../util/handleErrors');
var _       = require('lodash');


gulp.task('css', _.map(config.groups, function (groupConfig, groupName) {

    var taskName = 'css:' + groupName;

    gulp.task(taskName, function () {
        gulp.src(_.map(groupConfig.css, function (file) {
                return groupConfig.src + '/scss/' + file;
            }))
            .pipe(sass({
                // isolate each group files
                // because the plugin puts all
                // generated css in a single tmp dir
                container: groupName
            }))
            .on('error', onError)
            .pipe(concat('yuzu.' + groupName + '.css'))
            .pipe(gulp.dest(groupConfig.dest + '/css/'))
            .pipe(cssmin())
            .on('error', onError)
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(groupConfig.dest + '/css/'))
            .pipe(notify('ok, new css files for ' + groupName + ' generated'))
        ;
    });

    return taskName;
}));