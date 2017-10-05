'use strict';

const gulp = require( 'gulp' ),
    wiredep = require( 'wiredep' ).stream, // подключение библиотек выделенных <!-- bower:js --> <!-- endbower -->
    useref = require( 'gulp-useref' ), // пометка в HTML внешних CSS и JS <!-- build:js --> <!-- endbuild -->
    gulpif = require( 'gulp-if' ), // задаем правила при каких условиях выполнять плагины
    uglify = require( 'gulp-uglify' ), // минификация JS
    minifyCss = require( 'gulp-csso' ), // минификация CSS
    // minifyCss = require( 'gulp-clean-css' ); // не работает, затыкается на @import в css, поэтому использую gulp-csso
    clean = require( 'gulp-clean' ), // удаление данных из каталога
    autoprefixer = require( 'gulp-autoprefixer' ), // автоматическое добавления css префиксов
    imagemin = require( 'gulp-imagemin' ), // работа с изображениями
    imageminJpegRecompress = require( 'imagemin-jpeg-recompress' ), // работа с JPG
    cache = require( 'gulp-cache' ), // работа с кешем
    browserSync = require( 'browser-sync' ).create(), // live reload
    jasmineBrowser = require( 'gulp-jasmine-browser' ), // jasmine
    watch = require( 'gulp-watch' ); // отслеживание изменений

const config = {
    dist: './dist/',
    src: './src/',
    bowerComponents: './lib'
};

// чистим кеш
gulp.task( 'clean:cache', function ( done ) {
    return cache.clearAll( done );
} );

// очистка папки dist
gulp.task( 'clean', function () {
    return gulp.src( config.dist, { read: false } )
        .pipe( clean() );
} );

// оптимизация изображений
gulp.task( 'image', [ 'clean' ], function () {
    return gulp.src( [ config.src + 'img/*.jpg' ] )
        .pipe( cache( imagemin( [
            imagemin.jpegtran( { progressive: true } ),
            imageminJpegRecompress( {
                loops: 5,
                min: 65,
                max: 70,
                quality: 'medium'
            } )
        ], {
            verbose: true
        } ) ) )
        .pipe( gulp.dest( config.dist + '/img' ) );
} );

// css префиксы
gulp.task( 'cssprefix', function () {
    return gulp.src( config.src + 'css/**/*.css' )
        .pipe( autoprefixer( {
            browsers: [ 'last 4 versions' ],
            cascade: false
        } ) )
        .pipe( gulp.dest( config.src + 'css' ) )
} );

// сборка
gulp.task( 'build', [ 'clean', 'fonts', 'image', 'cssprefix' ], function () {
    return gulp.src( [ config.src + '*.html', config.src + '*.json' ] )
        .pipe( useref() )
        .pipe( gulpif( '*.js', uglify() ) )
        .pipe( gulpif( '*.css', minifyCss( { comments: false } ) ) )
        .pipe( gulp.dest( config.dist ) );
} );

gulp.task( 'fonts', [ 'clean' ], function () {
    return gulp.src( config.src + 'fonts/**/*' )
        .pipe( gulp.dest( config.dist + 'fonts' ) );
} );

// bower зависимости
gulp.task( 'bower', function () {
    return gulp.src( config.src + 'index.html' )
        .pipe( wiredep( {
            directory: config.bowerComponents
        } ) )
        .pipe( gulp.dest( config.src ) );
} );

// отслеживание
gulp.task( 'watch', function () {
    gulp.watch( 'bower.json', [ 'bower' ] );
} );

// live reload
gulp.task( 'bs', function () {
    browserSync.init( {
        server: {
            baseDir: config.src
        },
        notify: true
    } );
    browserSync.watch( config.src + '**/*' ).on( 'change', browserSync.reload );
} );

// test
gulp.task( 'jasmine', function () {
    var filesForTest = [
        './src/js/Container.js',
        './src/js/Basket.js',
        './lib/jquery/dist/jquery.js',
        './lib/jquery/dist/jquery-ui.js',
        './src/basket.json',
        './spec/**/*_spec.js'
    ];

    return gulp.src( filesForTest )
        .pipe( watch( filesForTest ) )
        .pipe( jasmineBrowser.specRunner() )
        .pipe( jasmineBrowser.server( { port: 8888 } ) );
} );

gulp.task( 'default', [ 'watch', 'bs' ] );