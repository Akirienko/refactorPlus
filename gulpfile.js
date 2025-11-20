const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

// Paths
const paths = {
  scss: {
    src: 'src/scss/**/*.scss',
    dest: 'assets/'
  }
};

// Compile SCSS to CSS
function compileSCSS() {
  return gulp.src(paths.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(gulp.dest(paths.scss.dest));
}

// Watch files
function watchFiles() {
  gulp.watch(paths.scss.src, compileSCSS);
}

// Define complex tasks
const build = gulp.series(compileSCSS);
const watch = gulp.series(build, watchFiles);

// Export tasks
exports.build = build;
exports.watch = watch;
exports.default = build;
