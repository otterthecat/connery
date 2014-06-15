// Gulp Dependencies
var gulp = require('gulp');
var gutil = require('gulp-util');

// Validation
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var jscs = require('gulp-jscs');

// Test
var mocha = require('gulp-mocha');

// Reports
var istanbul = require('gulp-istanbul');
var plato = require('gulp-plato');


var sources = ['index.js', './lib/*.js', 'gulpfile.js'];

gulp.task('lint', function(){

    gulp.src(sources)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('format', function(){
    gulp.src(sources)
        .pipe(jscs());
});


gulp.task('plato', function () {
    gulp.src(sources)
        .pipe(plato('./metrics/plato', {
            jshint: {
                options: {
                    strict: true
                }
            },
            complexity: {
                trycatch: true
            }
        }));
});


// Set up the file coverage
gulp.task('cover', function (cb) {
  gulp.src("./lib/**/*.js")
    .pipe(istanbul())
    .on('end', cb);
});

// Run tests and output reports
gulp.task('test', function () {
  gulp.run('cover', function () {
    gulp.src('./test/specs/*.js')
      .pipe(mocha()) // Run any unit test frameworks here
      .pipe(istanbul.writeReports('./metrics/coverage'));
  });
});

gulp.task('mocha', function(){

    gulp.src('./test/specs/*.js')
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', ['lint', 'format', 'mocha']);
gulp.task('report', ['test', 'plato']);