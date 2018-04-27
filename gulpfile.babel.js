import gulp from 'gulp';
// Runs the server
import browserSync from 'browser-sync';
// Bundles JS
import browserify from 'browserify';
import reactify from 'reactify';
// Use conventional text streams with Gulp
import source from 'vinyl-source-stream';

gulp.task('bundle', ['copy'], () =>
  browserify({
    entries: 'app/main.jsx',
    debug: true,
  })
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist')));

gulp.task('copy', () => {
  gulp.src(['app/*.css'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('serve', ['bundle'], () => {
  browserSync.init(null, {
    proxy: 'http://localhost:7777',
    port: 9001,
  });
});
