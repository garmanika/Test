let gulp = require('gulp'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename');
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cleanCss = require('gulp-clean-css');
  cssmin = require('gulp-cssmin');

gulp.task('sass', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(cleanCss({ level: { 2: { specialComments: 0 } }, format: 'beautify' }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('script', function() {
  return gulp.src([   
    'node_modules/jquery-form-styler/dist/jquery.formstyler.js',

  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
});

gulp.task('style', function() {
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
	  ])
    
    .pipe(concat('libs.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('app/css'))
});

gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function () {
  return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
});

gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'))
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('js'))
});

gulp.task('default', gulp.parallel('sass', 'watch', 'browser-sync', 'script', 'style'))