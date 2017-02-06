const gulp = require('gulp');
const exec = require('child_process').exec;

gulp.task('build-client', () => {
  exec("node_modules/.bin/webpack -p --config client-webpack.config.js", (err, stdout, stderr) => {
    console.log('Building Client Bundles');
    console.log(stdout)
    console.log(stderr)
  })
});

gulp.task('build-server', () => {
  exec("node_modules/.bin/webpack -p --config server-webpack.config.js", (err, stdout, stderr) => {
    console.log('Building Server Bundle');
    console.log(stdout)
    console.log(stderr)
  });
});

gulp.task('clean-dist', () => {
  exec("rm -rf ./dist", (err, stdout, stderr) => {
    console.log('Cleaning ./dist');
    console.log(stdout);
    console.log(stderr);
  });
});

gulp.task('build', ['clean-dist', 'build-client', 'build-server']);
