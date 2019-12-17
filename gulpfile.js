const paths = {
    src_scss: 'src/scss/**/*.scss',
    src_html: 'src/*.html',
    src_img: 'src/images/*',
    dest_css: 'public/styles',
    dest_html: 'public',
    dest_img: 'public/images'
}

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const { series } = require('gulp');

//copy all HTML files
function copyHTML() {
    return gulp.src(paths.src_html).pipe(gulp.dest(paths.dest_html));
}

//minimizing all the images.

function minifyImages() {
    return gulp.src(paths.src_img).pipe(imagemin()).pipe(gulp.dest(paths.dest_img));;
}

//Compile main style scss to css

function styles() {
    return gulp.src(paths.src_scss).pipe(sass().on('error', sass.logError)).pipe(gulp.dest(paths.dest_css));
}


function deleteHTML() {
    return gulp.src(`${paths.dest_html}/*.html`).pipe(clean())
}

function watch() {
    gulp.watch(paths.src_scss, styles);
    //rerender dest html
    gulp.watch(paths.src_html, gulp.series(deleteHTML, copyHTML))
}

//Exports
exports.copyHTML = copyHTML;
exports.deleteHTML = deleteHTML;
exports.minifyImages = minifyImages;
exports.styles = styles;
exports.watch = watch;