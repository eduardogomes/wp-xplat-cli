var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  eslint = require('gulp-eslint'),
  stylus = require('gulp-stylus'), 
  mocha = require('gulp-mocha');

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee handlebars',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

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
