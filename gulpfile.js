'use strict';

// Packages that were required in package.json
var del = require('del');
var gulp = require('gulp');
// var autoprefixer = require('gulp-autoprefixer');
// var csso = require('gulp-csso');
// var htmlmin = require('gulp-htmlmin');
// var uglify = require('gulp-uglify');
// var runSequence = require('run-sequence');


// Declare supported browsers for prefixing styles
// Ex. prefixing -webkit- for chrome
// const AUTOPREFIXER_BROWSERS = [
//     'ie >= 10',
//     'ie_mob >= 10',
//     'ff >= 30',
//     'chrome >= 34',
//     'safari >= 7',
//     'opera >= 23',
//     'ios >= 7',
//     'android >= 4.4',
//     'bb >= 10'
//   ];

// Deal with CSS files
// gulp.task('styles', function() {
//     return gulp.src('./styles/*.css')
//         // Auto-prefix css styles for cross browser compatability
//         .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
//         // Minify the file
//         .pipe(csso())
//         // Output
//         .pipe(gulp.dest('./assets/css'))
// });

// Deal with JS files
// gulp.task('scripts', function() {
//     return gulp.src('./scripts/*.js')
//     // Minify files
//     .pipe(uglify())
//     // Output
//     .pipe(gulp.dest('./assets/js/'))
// });

// Deal with HTML files
// gulp.task('pages', function() {
//     return gulp.src('./index.html')
//     // Minify files
//     .pipe(htmlmin({
//         collapseWhitespace: true,
//         removeComments: true
//     }))
//     .pipe(gulp.dest('./assets'));
// })

// Clean output directory
gulp.task('default', () => del(['assets']) );

// Gulp default runs all tasks
// gulp.task('default', ['clean'], function () {
//     runSequence(
//         'styles',
//         'scripts',
//         'pages'
//     );
// });