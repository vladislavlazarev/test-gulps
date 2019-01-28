'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
var browserSync = require('browser-sync').create();


gulp.task('styles', function() {
	return gulp.src('./src/styles/**/*.scss')
		.pipe(sourcemaps.init())
			.pipe(sass())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./build/assets/css/'));
});
gulp.task('images', function() {
	return gulp.src('./src/images/**/*.*')
		.pipe(gulp.dest('./build/assets/images/'));
});
gulp.task('fonts', function() {
	return gulp.src('./src/fonts/**/*.*')
		.pipe(gulp.dest('./build/assets/fonts/'));
});

gulp.task('views', function () {
	return gulp.src('./src/*.pug')
		.pipe(pug({
			// Your options in here.
		}))
		.pipe(gulp.dest('./build/'));
});
gulp.task('scripts', function () {
	return gulp.src('./src/scripts/**/*.js')
		.pipe(gulp.dest('./build/scripts/'));
});
gulp.task('clean', function () {
	return del('build')
});
gulp.task('watch', function () {
	gulp.watch('./src/scripts/**/*.js', gulp.series('scripts'));
	gulp.watch('./src/styles/**/*.scss', gulp.series('styles'));
	gulp.watch('./src/images/**/*', gulp.series('images'));
	gulp.watch('./src/fonts/**/*', gulp.series('fonts'));
});
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "./build"
		}
	});
});

gulp.task('ui', gulp.parallel('watch', 'browser-sync'));


gulp.task('build', gulp.series('clean', 'styles', 'images', 'fonts', 'views', 'scripts', 'ui'));
