var gulp   = require('gulp');
var _      = require('lodash');
var config = require('../config');

gulp.task('copy', _.map(config.groups, function (groupConfig, groupName) {

    var taskName = 'copy:' + groupName;

    gulp.task(taskName, [ taskName + ':fonts' ]);

    gulp.task(taskName + ':fonts', function () {
        return gulp.src(_.map(groupConfig.copy.fonts, function (file) {
                return groupConfig.src + '/' + file;
            }))
            .pipe(gulp.dest(groupConfig.dest + '/fonts'));
    });

    return taskName;
}));