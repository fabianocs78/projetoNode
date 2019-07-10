const gulp = require('gulp')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')

//gulp.task('app', ['app.html', 'app.css', 'app.js', 'app.assets'])


gulp.task('app.html', function(cb){
  gulp.src('app/**/*.html')
  .pipe(htmlmin({ collapseWhiteSpace: true}))
  .pipe(gulp.dest('public'))
  cb()
})

gulp.task('app.css', function(cb){
  gulp.src('app/**/*.css')
  .pipe(uglifycss({ "uglyComments": true }))
  .pipe(concat('app.min.css'))
  .pipe(gulp.dest('public/assets/css'))
  cb()
})


gulp.task('app.js', function(cb){
  gulp.src('app/**/*.js')
  .pipe(babel({ presets: ['env'] }))
  .pipe(uglify())
  .pipe(concat('app.min.js'))
  .pipe(gulp.dest('public/assets/js'))
  cb()
})

gulp.task('app.assets', function(cb){
  gulp.src('assets/**/*.*')
  .pipe(gulp.dest('public/assets'))
  cb()
})

gulp.task('app', gulp.series('app.html', 'app.css', 'app.js', 'app.assets'));
