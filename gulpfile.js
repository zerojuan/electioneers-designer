'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var less = require('gulp-less');
// var concat = require('gulp-concat');

gulp.task('styles', function(){
  return gulp.src('./less/main.less')
    .pipe(less({
      paths: ['./less']
    }))
    .pipe(gulp.dest('./styles'));
});

gulp.task('default', function(){
  gulp.start('styles');

  watch( './less/*.less', function(){
    gulp.start('styles');
  });
});
