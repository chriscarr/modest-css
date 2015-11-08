"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del'),
     browserSync = require('browser-sync');

 gulp.task('browser-sync', function() {
   browserSync({
     server: {
        baseDir: "./"
     }
   });
 });

 gulp.task('bs-reload', function () {
   browserSync.reload();
 });

gulp.task("concatScripts", function() {
    return gulp.src([
        'src/js/app.js'
        ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("src/js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('compileSass', function() {
  return gulp.src("src/scss/application.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['compileSass']);
  gulp.watch('src/js/main.js', ['concatScripts']);
})

gulp.task('clean', function() {
  del(['dist', 'css/application.css*', 'js/app*.js*']);
});

gulp.task("build", ['minifyScripts', 'compileSass'], function() {
  return gulp.src(["css/application.css", "js/app.min.js", 'index.html',
                   "img/**", "fonts/**"], { base: './'})
            .pipe(gulp.dest('dist'));
});

gulp.task("default", ["browser-sync"], function() {
  gulp.watch('*.html', 'src/scss/**/*.scss', 'src/js/main.js', reload);
});
