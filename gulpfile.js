var gulp = require('gulp');
var server = require('gulp-express');
var typescript = require('gulp-tsc');
var gutil      = require('gulp-util');
 
/*gulp.task('webserver', function() {
  connect.server({root: 'FrontEnd'});
}); */

gulp.task('server', function () {
    //start the server at the beginning of the task
    server.run({
        file: 'Server/server.js'
    });

    //restart the server when file changes
    gulp.watch(['Server/server.js', 'Server/**/*.js'], [server.run]);
});



gulp.task('ts', function(){
  gulp.src(['FrontEnd/scripts/**/*.ts'])
    .pipe(typescript()).on('error', function () {})
    .pipe(gulp.dest('FrontEnd/scripts/')).on('error', function () {})
});
 
gulp.task('default', ['server']);