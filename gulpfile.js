const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    babel = require('gulp-babel'),
    imageMin = require('gulp-imagemin'),
    minifyCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify');
const path = {
    src: {
        scss: "src/scss/**/*.scss",
        js: "src/js/*.js",
        img: "src/img/**/*"
    },
    dist: {
        self: "dist/",
        css: "dist/css/",
        js: "dist/js/",
        img: "dist/img/"
    }
};
/**************Functions*************/
const buildSCSS = () => (
    gulp.src(path.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(path.dist.css))
);
const buildJS = () => (
    gulp.src(path.src.js)
        .pipe(concat("script.min.js"))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist.js))
);
const buildIMG = () => (
    gulp.src(path.src.img)
        .pipe(imageMin())
        .pipe(gulp.dest(path.dist.img))
);
const cleanDist = () => (
    gulp.src(path.dist.self, {allowEmpty: true})
        .pipe(clean())
);
const watcher = () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch(path.src.scss, buildSCSS).on('change', browserSync.reload);
    gulp.watch(path.src.js, buildJS).on('change', browserSync.reload);
    gulp.watch(path.src.img, buildIMG).on('change', browserSync.reload);
};
/*************Tasks**************/
gulp.task('build', gulp.series(
    cleanDist,
    buildSCSS,
    buildJS,
    buildIMG,
));
gulp.task('dev', watcher);




