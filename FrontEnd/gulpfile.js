var gulp = require('gulp');
var connect = require('gulp-connect');
var typescript = require('gulp-tsc');
var gutil      = require('gulp-util');
 
gulp.task('webserver', function() {
  connect.server();
});

gulp.task('ts', function(){
  gulp.src(['scripts/**/*.ts'])
    .pipe(typescript()).on('error', function () {})
    .pipe(gulp.dest('scripts/')).on('error', function () {})
});
 
gulp.task('default', ['webserver']);