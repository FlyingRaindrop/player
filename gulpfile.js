var gulp = require('gulp'),
	  concatCss = require('gulp-concat-css'),
	  minifyCss = require('gulp-minify-css'),
	  notify = require('gulp-notify'),
	  browserSync = require('browser-sync'),
	  uglify = require( 'gulp-uglify' ),
	  wiredep = require('wiredep').stream,
	  gulpif = require('gulp-if'),
	  useref = require('gulp-useref'),
	  clean = require('gulp-clean'),
	  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade');
var compass = require('gulp-compass');
var spritesmith = require('gulp.spritesmith');


gulp.task('default', function(){
  gulp.src('app/css/**/*.css')
    .pipe(concatCss("bundle.css"))
    .pipe(minifyCss())
    .pipe(rename("bundle.min.css"))
    .pipe(notify("Done!"))
    .pipe(gulp.dest('dist'));
});

// СБОРКА
// Переносим HTML, CSS, JS в папку dist 
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
    .pipe(gulp.dest('dist'));
});

// Очистка
gulp.task('clean', function(){
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('watch', function(){
  gulp.watch([
    'app/*.html',
    'app/js/**/*.js',
    'app/css/**/*.css',
    ]).on('change',browserSync.reload);
  gulp.watch('app/jade/**/*.jade', ['jade']);
  gulp.watch('app/scss/**/*.scss', ['sass', 'compass']);
});

gulp.task('default', ['server','watch']);

gulp.task('server', function(){
  browserSync({
    port:9000,
    server:{
      baseDir: 'app'
    }
  });
});

gulp.task('jade', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('app/jade/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: '\t',
    }))
    .pipe(gulp.dest('app'))
});

gulp.task('sass', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('app/scss/**/*.scss', ['sass']);
});

gulp.task('compass', function() {
  gulp.src('app/scss/**/*.scss')
    .pipe(compass({
      config_file: 'app/scss/config.rb',
      css: 'app/css',
      sass: 'app/scss',
      sourcemap: true
    }))
    .pipe(gulp.dest('app/css'));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('app/images/sociconCircle/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss'
  }));
  return spriteData.pipe(gulp.dest('app/images/sprites'));
});

gulp.task('sprite-icons', function () {
  var spriteData = gulp.src('app/images/icons/*.png').pipe(spritesmith({
    imgName: 'sprite-icons.png',
    cssName: 'sprite-icons.scss'
  }));
  return spriteData.pipe(gulp.dest('app/images/sprites'));
});