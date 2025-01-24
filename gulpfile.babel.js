import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import {deleteAsync} from 'del';
import ws from 'gulp-webserver';
import newer from 'gulp-newer';
import imagemin from 'gulp-imagemin';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import miniCSS from 'gulp-csso'
import bro from 'gulp-bro';
import babelify from 'babelify'

const sass = gulpSass(dartSass);


const routers = {
    html :{
        watch : 'src/**/*.html',
        src : 'src/*.html',
        dest : 'dist',
    },
    img:{
        watch : 'src/img/**/*',
        src : 'src/img/*',
        dest : 'dist/img'
    },
    scss : {
        watch: 'src/scss/**/*.scss',
        src : 'src/scss/style.scss',
        dest : 'dist/css'
    },
    js : {
        watch : 'src/js/**/*.js',
        src : "src/js/main.js",
        dest: "dist/js"
    }
}

const clean = () => deleteAsync(['dist'])

const webServer = () => gulp.src(['dist']).pipe(ws({livereload: true,open:true,port:3030}))

const watch = () => {
    gulp.watch(routers.html.watch,html)
    gulp.watch(routers.scss.watch,styles)
    gulp.watch(routers.js.watch,js)
    gulp.watch(routers.img.watch,img)
}

const html  = () => gulp.src([routers.html.src])
    .pipe(fileInclude({prefix: "@@", basepath : 'src'}))
    .pipe(gulp.dest([routers.html.dest]));

const img = () => gulp.src(routers.img.src,{encoding: false})
    .pipe(newer(routers.img.src))
    .pipe(imagemin({verbose:true}))
    .pipe(gulp.dest(routers.img.dest));

const js = () => gulp.src(routers.js.src)
    .pipe(bro({transform: [babelify.configure({ presets: ['@babel/preset-env'] }), [ 'uglifyify', { global: true } ]]}))
    .pipe(gulp.dest(routers.js.dest));

const styles = () => gulp.src(routers.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(miniCSS())
    .pipe(gulp.dest(routers.scss.dest));

const prepare = gulp.series([clean])
const assets = gulp.series([html,img,styles,js])
const postDev = gulp.parallel([webServer,watch])


export const dev = gulp.series([prepare,assets,postDev])
