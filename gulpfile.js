    // Gulp Core
    const gulp = require('gulp');

    // css auto prefixer
    const autoprefixer = require('gulp-autoprefixer');
    // injecting header on css
    const header = require('gulp-header');
    // gulp image minifier
    const imagemin = require('gulp-imagemin');
    // notify about task
    const notify = require('gulp-notify');
    // passing options on gulp task
    const options = require('gulp-options');
    // plumber to handle error
    const plumber = require('gulp-plumber');
    // sass package to compile sass
    const sass = require('gulp-sass');
    // writing sourcemaps for sass
    const sourcemaps = require('gulp-sourcemaps');
    // merge stram for custom Javascript
    const merge = require('merge-stream');
    // browsersync to serve locally
    const browserSync = require('browser-sync').create();
    //javascript Minifier
    const uglify = require('gulp-uglify');
    //rename File
    const rename = require('gulp-rename');

    //package json to inject information on header
    let pkg = require('./app.json');

    /* modernizr Building */
    const modernizr = require('gulp-modernizr');
    const config = require('./modernizr-config.json');

    //injecting App header and Footer
    const headerfooter = require('gulp-headerfooter');
    const prettyHtml = require('gulp-pretty-html');

    //header And Footer File
    let fs = require('fs');

    // babel
    const babel = require('gulp-babel');

    const inject = require('gulp-inject');

    let banner = ['/**',
        '   Theme Name    : <%= pkg.name %>',
        '   Theme URI     : <%= pkg.uri %>',
        '   Author        : <%= pkg.author %>',
        '   Author URI    : <%= pkg.author_uri %>',
        '   Description   : <%= pkg.description %>',
        '   version       : <%= pkg.version %>',
        '   license       : <%= pkg.license %>',
        '   License URI:  : https://opensource.org/licenses/<%= pkg.license %>',
        '   Text Domain:  : ',
        '   Tags:         : <%= pkg.tags %>',
        '*/',
        ''
    ].join('\n');

    //Supported Browser list
    const supportedBrowsers = [
        'last 10 versions',
        'ie >= 10',
        'edge >= 12',
        'firefox >= 50',
        'chrome >= 50',
        'safari >= 5',
        'opera >= 10',
        'ios >= 6',
        'android >= 4',
        'blackberry >= 10',
        'operamobile >= 7',
        'samsung >= 4',
    ];

    let vendors = [{
            name: 'jquery',
            path: 'jquery/dist'
        },
        {
            name: 'bootstrap',
            path: 'bootstrap/dist'
        },
        {
            name: 'popper',
            path: 'popper.js/dist/umd'
        },
        {
            name: 'waypoints',
            path: 'waypoints/lib'
        },
        {
            name: 'prefixfree',
            path: 'prefixfree'
        },
        {
            name: 'slick',
            path: 'slick-carousel/slick'
        }
    ];
    
    let fonts = [{
            src: '@fortawesome/fontawesome-free',
            dest: 'font-awesome'
        },
        {
            src: 'devicon',
            dest: 'devicon'
        }
    ];

    let appPath = {
        src: 'app/',
        dev: 'dev',
        build: 'dist'
    };

    function pathName() {
        let path;
        if (options.has('build')) {
            path = appPath.build;
            return path;
        } else {
            path = appPath.dev;
            return path;
        }
    }


    function modernizrbuild(done) {
        gulp.src(appPath.src + '/**/*.js')
            .pipe(modernizr(config))
            .pipe(uglify({
                output: {
                    comments: 'some'
                }
            }))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(pathName() + '/assets/vendor/modernizr/'));
        done();
    }

    function browsers(done) {
        browserSync.init({
            watch: true,
            server: {
                baseDir: './dev/',
                injectChanges: true
            }
        });
        done();
    }

    function reload(done) {
        browserSync.reload();
        done();
    }

    function html(done) {
        gulp.src(appPath.src + '**/*.html')
            .pipe(gulp.dest(pathName() + '/'))
            .pipe(browserSync.stream());
        done();
    }

    function css(done) {
        gulp.src(appPath.src + '/stylesheet/style.scss')
            .pipe(plumber({
                errorHandler: function (err) {
                    notify.onError({
                        title: "Cool Man! There is an error on " + err.plugin,
                        message: err.toString()
                    })(err);
                }
            }))
            .pipe(header(banner, {
                pkg: pkg,
            }))
            .pipe(sourcemaps.init())
            .pipe(sass({
                errorLogToConsole: true,
                outputStyle: 'expanded'
            }))
            .on('error', console.error.bind(console))
            .pipe(autoprefixer({
                browsers: supportedBrowsers,
                cascade: false
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(pathName() + '/css/'))
            .pipe(browserSync.stream());
        done();
    }

    function vendor(done) {
        merge(vendors.map(function (vendor) {
            return gulp.src('node_modules/' + vendor.path + '/**/*.+(css|js|woff|gif)*')
                .pipe(gulp.dest(pathName() + '/assets/vendor/' + vendor.path.replace(/\/.*/, '')));
        }));
        done();
    }

    function font(done) {
        merge(fonts.map(function (font) {
            return gulp.src([
                    'node_modules/' + font.src + '/**/*.{ttf,woff,eot,svg,min.css,min.js,woff2}',
                    '!node_modules/' + font.src + '/**/*.map',
                    '!node_modules/' + font.src + '/**/*.selection.json',
                    '!node_modules/' + font.src + '/.npmignore',
                    '!node_modules/' + font.src + '/*.txt',
                    '!node_modules/' + font.src + '/*.md',
                    '!node_modules/' + font.src + '/*.json',
                    '!node_modules/' + font.src + '/less/*',
                    '!node_modules/' + font.src + '/scss/*',
                ])
                .pipe(gulp.dest(pathName() + '/assets/vendor/' + font.dest + '/'));
        }));
        done();
    }

    function assets(done) {
        gulp.src(appPath.src + '/assets/vendor/**/*')
            .pipe(gulp.dest(pathName() + '/assets/vendor/'));
        done();
    }

    function images(done) {
        gulp.src(appPath.src + 'assets/images/*')
            .pipe(imagemin({
                interlaced: true,
                progressive: true,
                optimizationLevel: 5
            }))
            .pipe(gulp.dest(pathName() + '/assets/images/'))
            .pipe(browserSync.stream());
        done();
    }

    function staticjS(done) {
        gulp.src(appPath.src + '/scripts/scripts.js')
            .pipe(header(banner, {
                pkg: pkg,
            }))
            .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(pathName() + '/scripts/'))
            .pipe(browserSync.stream());
        done();
    }

    function watch_file() {
        gulp.watch('./app/**/*.scss', gulp.series(css, reload));
        gulp.watch('./app/**/*.html', gulp.parallel(html, reload));
        gulp.watch('./app/**/*.js', gulp.series(staticjS, reload));
        gulp.watch('./app/assets/images/**', gulp.series(images, reload));
        gulp.watch('./app/assets/vendor/**', gulp.series(assets, reload));
        return;
    }

    function dependency(done) {
        gulp.src('./dependency.json')

            .pipe(inject(gulp.src([
                './' + pathName() + '/**/*.js',
                './' + pathName() + '/**/*.css',
                './' + pathName() + '/**/*.html',
            ], {
                read: false
            }), {

                starttag: '"{{ext}}": [',
                endtag: ']',
                transform: function (filepath, file, i, length) {
                    return '  "' + filepath + '"' + (i + 1 < length ? ',' : '');
                }
            }))
            .pipe(gulp.dest('./'));
        done();
    }


    exports.html = html;
    exports.assets = assets;
    exports.js = staticjS;
    exports.css = css;
    exports.font = font;
    exports.dependency = dependency;
    exports.vendor = gulp.series(modernizrbuild, font, vendor);
    exports.watch = gulp.parallel(vendor, assets, html, css, staticjS, images, browsers, watch_file);
    exports.default = gulp.parallel(modernizrbuild, html, assets, vendor, images, font, css, staticjS);