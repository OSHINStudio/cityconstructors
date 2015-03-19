var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    // imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    // clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    // livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();

gulp.task('styles', function() {
    return gulp.src('assets/styles/source/style.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('assets/styles'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/styles'))
    // .pipe(livereload(server))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('plugins', function() {
    return gulp.src(['assets/js/source/vendor/*.js'])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    // .pipe(livereload(server))
    .pipe(notify({ message: 'Plugin Scripts task complete' }));
});

gulp.task('main-script', function() {
    return gulp.src(['assets/js/source/app/app.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    // .pipe(livereload(server))
    .pipe(notify({ message: 'Main Script task complete' }));
});

// Watch
gulp.task('watch', function() {
 
    // Listen on port 35729
    server.listen(35729, function (err) {

        if (err) {
            return console.log(err)
        };
         
        // Watch .scss files
        gulp.watch('assets/styles/source/**/*.scss', ['styles']);
         
        // Watch .js files
        gulp.watch('assets/js/source/vendor/*.js', ['plugins']);
        gulp.watch('assets/js/source/app/app.js', ['main-script']);
         
        // // Watch image files
        // gulp.watch('assets/images/**/*', ['images']);
     
    });
 
});

gulp.task('default', ['styles', 'plugins', 'main-script', 'watch']);