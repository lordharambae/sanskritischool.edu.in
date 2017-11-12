"use strict"

const gulp = require("gulp")
const pug = require("gulp-pug")
const htmlbeautify = require("gulp-html-beautify")
const htmllint = require("gulp-htmllint")
const stylus = require("gulp-stylus")
const autoprefix = require("gulp-autoprefixer")
const cssbeautify = require("gulp-cssbeautify")
const csslint = require("gulp-csslint")
const babel = require("gulp-babel")
const jsbeautify = require("gulp-jsbeautify")
const eslint = require("gulp-eslint")
const uglify = require("gulp-uglify")

gulp.task("html-pug", () => {
	return gulp.src("pug/**/*.pug")
		.pipe(pug())
		.pipe(gulp.dest("html"))
})

gulp.task("pug-beautify", () => {
	return gulp.src("pug/**/*.pug")
		.pipe(pug())
		.pipe(htmlbeautify())
		.pipe(gulp.dest("html"))
})

gulp.task("html-beautify", () => {
	return gulp.src("html/**/*.html")
		.pipe(htmlbeautify())
		.pipe(gulp.dest("html"))
})

gulp.task("html-lint", () => {
	return gulp.src("html/**/*.html")
		.pipe(htmllint())
})

gulp.task("css-stylus", () => {
	return gulp.src("styl/**/*.styl")
		.pipe(stylus({
			compress: false
		}))
		.pipe(gulp.dest("css"))
})

gulp.task("stylus-autoprefix", () => {
	return gulp.src("styl/**/*.styl")
		.pipe(stylus({
			compress: false
		}))
		.pipe(autoprefix({
			cascade: false
		}))
		.pipe(gulp.dest("css"))
})

gulp.task("css-autoprefix", () => {
	return gulp.src("css/**/*.css")
		.pipe(autoprefix({
			cascade: false
		}))
		.pipe(gulp.dest("css"))
})

gulp.task("css-beautify", () => {
	return gulp.src("css/**/*.css")
		.pipe(csslint())
		.pipe(gulp.dest("css"))
})

gulp.task("css-lint", () => {
	return gulp.src("css/**/*.css")
		.pipe(csslint())
})

gulp.task("js-babel", () => {
	return gulp.src("es/**/*.es")
		.pipe(babel({
			presets: ["env"],
			minified: false
		}))
		.pipe(gulp.dest("js"))
})

gulp.task("js-beautify", () => {
	return gulp.src("js/**/*.js")
		.pipe(jsbeautify())
		.pipe(gulp.dest("js"))
})

gulp.task("es-lint", () => {
	return gulp.src("js/**/*.js")
		.pipe(eslint())
		.pipe(gulp.dest("js"))
})

gulp.task("html", ["html-pug", "html-beautify", "html-lint"])

gulp.task("css", ["css-stylus", "css-autoprefix", "css-beautify", "css-lint"])

gulp.task("js", ["js-babel", "js-beautify", "es-lint"])

gulp.task("preprocess", ["html-pug", "css-stylus", "js-babel"])

gulp.task("beautify", ["html-beautify", "css-beautify", "js-beautify"])

gulp.task("lint", ["html-lint", "css-lint", "es-lint"])

gulp.task("run", ["preprocess", "beautify", "lint"])

gulp.task("watch-html", ["html"], () => {
	gulp.watch(["pug/**/*.pug", "html/**/*.html"], ["html"])
})

gulp.task("watch-css", ["css"], () => {
	gulp.watch(["styl/**/*.styl", "css/**/*.css"], ["css"])
})

gulp.task("watch-js", ["js"], () => {
	gulp.watch(["es/**/*.es", "js/**/*.js"], ["js"])
})

gulp.task("watch-preprocess", ["html-pug", "css-stylus", "js-babel"], () => {
	gulp.watch(["pug/**/*.pug", "html/**/*.html", "styl/**/*.styl", "css/**/*.css", "es/**/*.es", "js/**/*.js"], ["html-pug", "css-stylus", "js-babel"])
})

gulp.task("watch-beautify", ["html-beautify", "css-beautify", "js-beautify"], () => {
	gulp.watch(["pug/**/*.pug", "html/**/*.html", "styl/**/*.styl", "css/**/*.css", "es/**/*.es", "js/**/*.js"], ["html-beautify", "css-beautify", "js-beautify"])
})

gulp.task("watch-lint", ["html-lint", "css-lint", "es-lint"], () => {
	gulp.watch(["pug/**/*.pug", "html/**/*.html", "styl/**/*.styl", "css/**/*.css", "es/**/*.es", "js/**/*.js"], ["html-lint", "css-lint", "es-lint"])
})

gulp.task("watch", ["run"], () => {
	gulp.watch(["pug/**/*.pug", "html/**/*.html", "styl/**/*.styl", "css/**/*.css", "es/**/*.es", "js/**/*.js"], ["run"])
})
