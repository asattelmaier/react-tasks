import gulp from 'gulp';
// Bundles JS
import browserify from 'browserify';
// Babel browserify transform
import babelify from 'babelify';
// React browserify transform
import reactify from 'reactify';
// Use conventional text streams with Gulp
import source from 'vinyl-source-stream';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

const devSrc = './app';
const distSrc = './dist';

const gulpConfig = {
  dev: {
    entryJsx: `${devSrc}/main.jsx`,
    entryScss: `${devSrc}/main.scss`,
  },
  dist: {
    entryJs: 'app.js',
    entryScss: `${distSrc}/main.css`,
  },
  browserify: {
    entries: './app/main.jsx',
    debug: true,
  },
};

gulp.task('default', () =>
  browserify(gulpConfig.browserify)
    .transform(babelify)
    .transform(reactify)
    .bundle()
    .pipe(source(gulpConfig.dist.entryJs))
    .pipe(gulp.dest(distSrc)));

gulp.task('watch', ['sass:watch'], () => {
  gulp.watch(
    [`${devSrc}/**/*.jsx`, `${devSrc}/**/*.js`],
    ['default'],
  );
});

gulp.task('sass', () =>
  gulp.src('./app/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/css')));

gulp.task('sass-dependencies', () =>
  gulp.src('./node_modules/normalize.css/normalize.css')
    .pipe(sass({ outputStyle: 'compressed' })
      .on('error', sass.logError))
    .pipe(gulp.dest('./dist/css')));

gulp.task('sass:watch', () => {
  gulp.watch('./app/**/*.scss', ['sass']);
});
