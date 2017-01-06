/*
* @Author: 曹曹
* @Date:   2017-01-05 16:40:45
* @Last Modified by:   曹曹
* @Last Modified time: 2017-01-05 18:23:29
*/

'use strict';
var gulp = require("gulp");
var htmlmin = require("gulp-htmlmin");

var sass = require("gulp-sass");
var concatCss = require("gulp-concat-css");
var cssnano = require("gulp-cssnano");

var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var jshint = require("gulp-jshint");

var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

//1.处理html页面
gulp.task("html", function() {
	gulp.src("*.html")
		.pipe(htmlmin({
			collapseWhitespace: true,//压缩html中的空白字符
			collapseBooleanAttributes: true,//省略布尔属性的值
			removeAttributeQuotes: true,//删除所有属性值得引号
			removeCommments: true,//删除注释
			removeEmptyAttributes: true,//删除空格做属性值
			removeScriptTypeAttributes: true,//删除script的type
			removeStyleLinkTypeAttributes: true//删除style和link的type
		}))
		.pipe(gulp.dest("dist/"))
		.pipe(reload({stream: true}));
});

//2.css， 转换合并压缩
gulp.task("css", function() {
	gulp.src("css/*.scss")
		.pipe(sass())
		.pipe(concatCss("main.css"))
		.pipe(cssnano())
		.pipe(gulp.dest("dist/css"))
		.pipe(reload({stream: true}));

});

//3.js --合并， 压缩，，混淆
gulp.task("js", function() {
	gulp.src("js/*.js")
		.pipe(concat("app.js"))
		.pipe(uglify())
		.pipe(jshint())
		.pipe(gulp.dest("dist/js"))
		.pipe(reload({stream: true}));

});

//4.图片处理

gulp.task("img", function() {
	gulp.src("img/*.*")
		.pipe(gulp.dest("dist/img"))
		.pipe(reload({stream: true}));

});

//5.处理fonts
gulp.task("fonts", function() {
	gulp.src("fonts/*.*")
		.pipe(gulp.dest("dist/fonts"))
		.pipe(reload({stream: true}));

});

//6.处理lib
gulp.task("lib", function() {
	gulp.src("lib/**/*.*")
		.pipe(gulp.dest("dist/lib"))
		.pipe(reload({stream: true}));

});

//7.编译任务
gulp.task("build", ['css', 'js', 'img', 'html', 'fonts', 'lib']);

//8.开启服务器
gulp.task("server", ["build"], function() {
	browserSync.init({
		server: {
			baseDir: "dist/"
		}
	});

	gulp.watch("css/*.css", ["css"]);
	gulp.watch("js/*.js", ["js"]);
	gulp.watch("img/*.*", ["img"]);
	gulp.watch("*.html", ["html"]);
	gulp.watch("fonts/*.*", ["fonts"]);
	gulp.watch("lib/**/*.*", ["lib"]);

});