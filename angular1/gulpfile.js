const gulp = require('gulp')
const util = require('gulp-util')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')
//const watch = require('gulp-watch')
const browsersync = require("browser-sync").create();
const webserver = require('gulp-webserver')
const del = require('del')


// Clean assets
function clean() {
  return del(['public/assets/'])
}


//require('./gulpTasks/deps')
function deps_js(){
  return gulp.src([
    'node_modules/angular/angular.min.js',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    'node_modules/admin-lte/plugins/jQuery/jquery-2.2.3.min.js',
    'node_modules/admin-lte/bootstrap/js/bootstrap.min.js',
    'node_modules/admin-lte/plugins/slimScroll/jquery.slimscroll.min.js',
    'node_modules/admin-lte/dist/js/app.min.js',
    'node_modules/angular-toastr/dist/angular-toastr.tpls.js'

  ])
  .pipe(uglify())
  .pipe(concat('deps.min.js'))
  .pipe(gulp.dest('public/assets/js'))
}

function deps_css() {
  return gulp.src([
   'node_modules/angular-toastr/dist/angular-toastr.min.css',
   'node_modules/font-awesome/css/font-awesome.min.css',
   'node_modules/admin-lte/bootstrap/css/bootstrap.min.css',
   'node_modules/admin-lte/dist/css/AdminLTE.min.css',
   'node_modules/admin-lte/dist/css/skins/_all-skins.min.css'
 ])
   .pipe(uglifycss({ "uglyComments": true }))
   .pipe(concat('deps.min.css'))
   .pipe(gulp.dest('public/assets/css'))
}


function deps_fonts(){
  return gulp.src([
    'node_modules/font-awesome/fonts/*.*',
    'node_modules/admin-lte/bootstrap/fonts/*.*',
  ])
  .pipe(gulp.dest('public/assets/fonts'))
}


//require('./gulpTasks/app')
function html(){
  return gulp.src('app/**/*.html')
  .pipe(htmlmin({ collapseWhiteSpace: true}))
  .pipe(gulp.dest('public'))
}

function css(){
  return gulp.src('app/**/*.css')
  .pipe(uglifycss({ "uglyComments": true }))
  .pipe(concat('app.min.css'))
  .pipe(gulp.dest('public/assets/css'))
}


function js(){
  return gulp.src('app/**/*.js')
  .pipe(babel({ presets: ['env'] }))
  .pipe(uglify())
  .pipe(concat('app.min.js'))
  .pipe(gulp.dest('public/assets/js'))
}

function assets(){
  return gulp.src('assets/**/*.*')
  .pipe(gulp.dest('public/assets'))
}

//require('./gulpTasks/server')
function watchFiles(){
  gulp.watch('app/**/*.html',html)
  gulp.watch('app/**/*.css', css)
  gulp.watch('app/**/*.js', js)
  gulp.watch('assets/**/*.*', assets)
}

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "public/"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// define complex tasks
const deps = gulp.series(deps_js, deps_css, deps_fonts)
const watch = gulp.parallel(watchFiles, browserSync)
const app = gulp.series(clean, gulp.series(deps,html, css, js, assets, watch))


// export tasks
exports.css = css;
exports.deps = deps;
exports.clean = clean;
exports.app = app;
exports.watch = watch;
exports.default = app;


//gulp.task('default', gulp.series('deps.js', 'deps.css', 'deps.fonts','app.html', 'app.css', 'app.js', 'app.assets', 'watch', 'server'));
