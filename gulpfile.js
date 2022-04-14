'use strict';

// Must run 'Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass' in cmd to execute gulp command
// Packages that were required in package.json
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify_es = require('gulp-uglify-es').default;

// Deal with HTML files
gulp.task('min-html', function() {
    return gulp.src('./html/homepage.html')
    // Minify files
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
    }))
    .pipe(gulp.dest('./'));
})

// Deal with CSS files
gulp.task('prefix-min-css', function() {
    return gulp.src('./css/*.css')
        // Auto-prefix css styles for cross browser compatability
        .pipe(autoprefixer())
        // Minify the files
        .pipe(csso())
        // Concatenate the files
        .pipe(concat('styles.css'))
        // Output
        .pipe(gulp.dest('./'))
});

// Deal with JS files
gulp.task('min-js', function() {
    return gulp.src('./js/*.js')
    // Minify files
    .pipe(uglify_es())
    // Output
    .pipe(gulp.dest('./scripts/'))
});

// Remove output of last gulp command
gulp.task('clean', () => del(['./scripts', './index.html', './styles.css']) );

// Gulp default runs all tasks
gulp.task('default', gulp.series('clean', 'min-html', 'prefix-min-css', 'min-js'));