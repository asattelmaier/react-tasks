import gulp from 'gulp';
// Runs the server
import browserSync from 'browser-sync';
// Bundles JS
import browserify from 'browserify';
import reactify from 'reactify';
// Use conventional text streams with Gulp
import source from 'vinyl-source-stream';

const devFile = './app/main.jsx';
const distFile = 'app.js';
const distDir = './dist';

const browserifyOptions = {
  entries: devFile,
  debug: true,
};

gulp.task('default', () =>
  browserify(browserifyOptions)
    .transform(reactify)
    .bundle()
    .pipe(source(distFile))
    .pipe(gulp.dest(distDir)));

gulp.task('watch', () => {
  gulp.watch(devFile, ['default']);
});
