const paths = {
    src_scss: 'src/scss/**/*.scss',
    src_html: 'src/*.html',
    src_img: 'src/images/*',
    public_main_style: "public/styles/main.css",
    public_css: 'public/styles',
    public_html: 'public',
    public_img: 'public/images'
}

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const { series } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

//copy all HTML files
function copyHTML() {
    return gulp.src(paths.src_html).pipe(gulp.public(paths.public_html));
}

//minimizing all the images.

function minifyImages() {
    return gulp.src(paths.src_img).pipe(imagemin()).pipe(gulp.public(paths.public_img));;
}

//Compile main style scss to css

function styles() {
    return gulp.src(paths.src_scss).pipe(sass().on('error', sass.logError)).pipe(gulp.public(paths.public_css));
}


function deleteHTML() {
    return gulp.src(`${paths.public_html}/*.html`).pipe(clean())
}

function watch() {
    gulp.watch(paths.src_scss, styles);
    //rerender public html
    gulp.watch(paths.src_html, gulp.series(deleteHTML, copyHTML))
}

function prefixes() {
    return gulp.src(paths.public_main_style).pipe(autoprefixer({ cascade: false })).pipe(gulp.dest(paths.public_css))
}

function minifyCSS() {
    return gulp.src(paths.public_main_style).pipe(cssmin()).pipe(rename({ suffix: '.min' })).pipe(gulp.dest(paths.public_css))
}

//Exports
exports.copyHTML = copyHTML;
exports.deleteHTML = deleteHTML;
exports.minifyImages = minifyImages;
exports.styles = styles;
exports.watch = watch;
exports.prefixes = prefixes;
exports.minifyCSS = minifyCSS;