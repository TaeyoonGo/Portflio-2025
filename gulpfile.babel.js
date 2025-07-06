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
import ghpages from 'gulp-gh-pages';

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
        src : "src/js/*",
        dest: "dist/js"
    },
    lottie : {
        watch : 'src/lottie/**/*',
        src : 'src/lottie/*',
        dest : 'dist/lottie'
    }
}

const clean = () => deleteAsync(['dist',".publish"])

const webServer = () => gulp.src(['dist']).pipe(ws({livereload: true,open:true,port:3030}))

const gh = () => gulp.src("dist/**/*").pipe(ghpages());

const watch = () => {
    gulp.watch(routers.html.watch,html)
    gulp.watch(routers.scss.watch,styles)
    gulp.watch(routers.js.watch,js)
    gulp.watch(routers.img.watch,img)
    gulp.watch(routers.lottie.watch,lottie)
}

const html  = () => gulp.src([routers.html.src])
    .pipe(fileInclude({prefix: "@@", basepath : 'src'}))
    .pipe(gulp.dest([routers.html.dest]));

const img = () => gulp.src(routers.img.src,{encoding: false})
    .pipe(newer(routers.img.src))
    .pipe(imagemin({verbose:true}))
    .pipe(gulp.dest(routers.img.dest));

const lottie = () => gulp.src(routers.lottie.src)
    .pipe(gulp.dest(routers.lottie.dest));

const js = () => gulp.src(routers.js.src)
    .pipe(bro({transform: [babelify.configure({ presets: ['@babel/preset-env'] }), [ 'uglifyify', { global: true } ]]}))
    .pipe(gulp.dest(routers.js.dest));

const styles = () => gulp.src(routers.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(miniCSS())
    .pipe(gulp.dest(routers.scss.dest));

const prepare = gulp.series([clean])
const assets = gulp.series([html,img,styles,js,lottie])
const live = gulp.parallel([webServer,watch])


export const build = gulp.series([prepare,assets])
export const dev = gulp.series([build,live])
export const deploy = gulp.series([build,gh,clean])
