'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var server = {
  host: 'localhost',
  port: '8001'
}

// run sass
gulp.task('sass', function () {
  return gulp.src('css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

// run sass:watch
gulp.task('sass:watch', function () {
  gulp.watch('css/*.scss', ['sass']);
});

// run server 
 
gulp.task('webserver', function() {
  gulp.src( '.' )
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true,
      directoryListing: false,
	  open: true
    }));
});