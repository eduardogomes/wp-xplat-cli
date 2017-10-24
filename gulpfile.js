var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  eslint = require('gulp-eslint'),
  stylus = require('gulp-stylus'), 
  mocha = require('gulp-mocha');

gulp.task('lint', function () {
  return gulp.src('app/**')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', function () {
  return gulp.src('tests/**/*.js')
    .pipe(mocha());
});

gulp.task('unitTest', function () {
  return gulp.src('tests/unit/*.js')
    .pipe(mocha());
});

gulp.task('build', [
  'lint',
  'test'
]);
