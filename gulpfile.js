const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')( require('sass') );
const plumber = require('gulp-plumber');
const webp = require('gulp-webp');
// const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const avif = require('gulp-avif');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
// const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser-js');

/* Workflow de CSS */
function css(done) {
    src('src/scss/**/*.scss', { sourcemaps: true })
        .pipe( plumber() )
        .pipe( sass() )
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        // .pipe( sourcemaps.write('.') )
        .pipe( dest('build/css', { sourcemaps: true }) )
    done();
}

/* Workflow de JS*/
function javascript( done ) {
    src( ['node_modules/bootstrap/dist/js/bootstrap.js', 
        'src/js/**/*.js'], { sourcemaps: true } )
        // .pipe( sourcemaps.init() )
        .pipe( terser() )
        // .pipe( sourcemaps.write('.') )
        .pipe( dest('build/js', { sourcemaps: true }) );
    done();
}

/* Workflow de Imágenes */
function versionWebp( done ) {
    const options = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( webp(options) )
        .pipe( dest('build/img') )
    done();
}
function versionAvif( done ) {
    const options = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( avif(options) )
        .pipe( dest('build/img') )
    done();
}
function imagenes( done ) {
    const options = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(options) ) )
        .pipe( dest('build/img') )
    done();
}

/* Watch */
function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

exports.css = css;
exports.dev = dev;
exports.javascript = javascript;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.imagenes = imagenes;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);