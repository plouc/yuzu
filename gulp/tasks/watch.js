var gulp   = require('gulp');
var config = require('../config');
var _      = require('lodash');


gulp.task('watch', _.map(config.groups, function (groupConfig, groupName) {

    var taskName = 'watch:' + groupName;

    gulp.task(taskName, function () {
        gulp.watch(groupConfig.src + '/scss/**', [ 'css:' + groupName ]);
        gulp.watch(groupConfig.src + '/js/**',   [ 'js:'  + groupName ]);
    });

    return taskName;
}));
