import gulp from "gulp";
const { src, dest, watch, parallel } = gulp; 
import gulpSass from 'gulp-sass';
import * as nodeSass from 'sass';
const sass = gulpSass(nodeSass);
import plumber from 'gulp-plumber';
import webp from 'gulp-webp';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import avif from 'gulp-avif';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcss from 'gulp-postcss';
// const sourcemaps = require('gulp-sourcemaps');
import terser from 'gulp-terser-js';

/* Workflow de CSS */
function _css(done) {
    src('src/scss/**/*.scss', { sourcemaps: true })
        .pipe( plumber() )
        .pipe( sass() )
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        // .pipe( sourcemaps.write('.') )
        .pipe( dest('build/css', { sourcemaps: true }) )
    done();
}

/* Workflow de JS*/
function _javascript( done ) {
    src( ['node_modules/bootstrap/dist/js/bootstrap.js', 
        'src/js/**/*.js'], { sourcemaps: true } )
        // .pipe( sourcemaps.init() )
        .pipe( terser() )
        // .pipe( sourcemaps.write('.') )
        .pipe( dest('build/js', { sourcemaps: true }) );
    done();
}

/* Workflow de Imágenes */
function _versionWebp( done ) {
    const options = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( webp(options) )
        .pipe( dest('build/img') )
    done();
}
function _versionAvif( done ) {
    const options = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( avif(options) )
        .pipe( dest('build/img') )
    done();
}
function _imagenes( done ) {
    const options = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(options) ) )
        .pipe( dest('build/img') )
    done();
}

/* Watch */
function _dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

const css = _css;
export { css as css };
const tdev = _dev;
export { tdev as tdev };
const javascript = _javascript;
export { javascript as javascript };
const versionWebp = _versionWebp;
export { versionWebp as versionWebp };
const versionAvif = _versionAvif;
export { versionAvif as versionAvif };
const imagenes = _imagenes;
export { imagenes as imagenes };
const dev = parallel(imagenes, versionWebp, versionAvif, javascript, tdev);
export { dev as dev };