var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', function() {
    gulp.watch(config.source + '/scss/**', ['sass']);
    gulp.watch(config.source + '/js/**',   ['browserify']);
});
