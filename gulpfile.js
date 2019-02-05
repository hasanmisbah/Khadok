const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');


//cs task
function css (done){
    gulp.src('./app/stylesheet/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole : true,
            outputStyle : 'expanded'

        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            browsers: ['> 0%'],
            cascade: false
        }))
        .pipe(rename({suffix : '.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./tmp/css/'));
    done();
}
exports.css = css;