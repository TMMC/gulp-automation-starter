/*! additional-tasks.js - 2016-11-05 */
// npm i -D gulp-coffee gulp-connect gulp-notify gulp-git

var gulp   = require('gulp'),
  fs       = require('fs'),
  pkg      = JSON.parse(fs.readFileSync('./package.json')),
  cfg      = JSON.parse(fs.readFileSync('./config.json')),
  plugins  = require('gulp-load-plugins')(cfg.pluginsOptions);

// == compile-scripts task: sample task compiling js and coffee + toast notification
gulp.task('compile-scripts', function () {
  // Compile coffee to js.
	var coffeeToJs = gulp.src([ cfg.dirs.srcCoffee + '/**/*.coffee' ])
		.pipe(plugins.coffee());
  // Sources for js files.
	var jsSources = gulp.src([ cfg.dirs.srcJs + '/**/*.js' ]);
  // Merge streams and compile all
	return plugins.merge(coffeeToJs, jsSources)
    .pipe(plugins.plumber())
  	.pipe(plugins.concat('all.js'))
  	.pipe(gulp.dest(cfg.dirs.distJs));
    .pipe(plugins.uglify(cfg.uglifyOptions))
    .pipe(plugins.rename({ extname : '.min.js' }))
    .pipe(gulp.dest(cfg.dirs.distJs))
    // Native OS toast notification with `gulp-notify`
    .pipe(plugins.notify({
      emitError : false,  // default
      title     : 'TASK: compile-scripts',
      message   : ' ✔ JavaScript and CoffeeScripts processed.',
      onLast    : true    // default: false
    }));
});

// == connect task: start server with livereload
gulp.task('connect', function() {
  plugins.connect.server({
    host: 'localhost',
    https: true,
    livereload: { // Object or Boolean (true for livereload to work)
      port: cfg.ports.lrDefault,
      hostname: 'localhost'
    },
    name: 'Dist Server',
    port: cfg.ports.alpha,
    root: [ cfg.dirs.distBase ]
  });
});

// == sample-task: shows usage of page reloading per task (in this case just copies index.html)
gulp.task('sample-task', function() {
  return gulp.src([ cfg.dirs.distBase + '/index.html' ])
    .pipe(plugins.plumber())
    .pipe(gulp.dest(cfg.dirs.distBase))
    // Using gulp-connect instead of browser-sync: add the line below to your task after piping to dest or notify
    .pipe(plugins.connect.reload());
});

// == clone-repo task: clone remote repo to subdirectory ($CWD/components/git-repo)
gulp.task('clone-repo', function() {
  plugins.git.clone('https://github.com/githubtraining/example-basic', {args: './' + cfg.dirs.comps}, function(err) {
    if (err) { plugins.util.log(plugins.util.colors.bold.red(err)); this.emit('end'); } // Handle errors
  });
});
