var gulp         = require('gulp');
var sass         = require('gulp-ruby-sass');
var handleErrors = require('../util/handleErrors');
var config       = require('../config');
var notify       = require('gulp-notify');

gulp.task('sass', function () {
    gulp.src(config.source + '/scss/*.scss')
        .pipe(sass())
        .on('error', handleErrors)
        .pipe(gulp.dest(config.dest + '/css'))
        .pipe(notify('ok, new css files generated'))
    ;
});