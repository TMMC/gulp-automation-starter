"use strict";

// ==============================================
// === Require & in-file config
// ==============================================
var gulp            = require('gulp'),
  // fs                = require('fs'),
  // pkg               = JSON.parse(fs.readFileSync('./package.json')),
  // cfg               = JSON.parse(fs.readFileSync('./config.json')),
  pkg               = require('./package.json'),
  cfg               = require('./config.json'),
  bannerLong        = cfg.banners.long.join('\n'),
  bannerMedium      = cfg.banners.medium.join('\n'),
  bannerShort       = cfg.banners.short.join('\n'),
  bannerFile        = cfg.banners.file.join('\n'),
  jqueryChk         = cfg.jqueryCheck.join('\n'),
  jqueryVerChk      = cfg.jqueryVersionCheck.join('\n'),
  plugins           = require('gulp-load-plugins')(cfg.pluginsOptions),
  bs                = plugins.browserSync.create("BrowserSync Dist Server"),
  pageRelad         = bs.reload,
  lessAutoprefixer  = new plugins.lessAutoprefix(cfg.autoprefixerOptions),
  lessCleanCss      = new plugins.lessCleanCss(cfg.cleanCssOptions),
  exec              = require('child_process').exec;

// ==============================================
// === Standalone tasks
// ==============================================

// == clean-comps task: removing components directory
gulp.task('clean-comps', function() {
  return plugins.del([ cfg.dirs.comps ]);
});

// == clean-res task: removing specified assets and sources
gulp.task('clean-res', function() {
  return plugins.del([
    cfg.dirs.distJs + '/**/*.*',
    '!' + cfg.dirs.distJs,
    cfg.dirs.distCss + '/**/*.*',
    '!' + cfg.dirs.distCss,
    cfg.dirs.distFonts + '/**/*.*',
    '!' + cfg.dirs.distFonts,
    cfg.dirs.distContent + '/**/*.*',
    cfg.dirs.distImg + '/**/*.*',
    '!' + cfg.dirs.distImg,
    '!' + cfg.dirs.distContent,
    cfg.dirs.distBase + '/*.{html,php,md,txt}',
    cfg.dirs.distBase + '/.htaccess',
    '!' + cfg.dirs.distBase,
    cfg.dirs.srcSass + '/bootstrap/**/',
    cfg.dirs.srcSass + '/fontawesome/**/',
    cfg.dirs.srcSass + '/_bootstrap.scss',
    cfg.dirs.srcSass + '/_lato-font.scss',
    '!' + cfg.dirs.srcSass,
    '!' + cfg.dirs.srcSass + '/animate-css',
    cfg.dirs.srcLess + '/bootstrap/**/',
    cfg.dirs.srcLess + '/fontawesome/**/',
    cfg.dirs.srcLess + '/lato-font.less',
    '!' + cfg.dirs.srcLess,
    '!' + cfg.dirs.srcLess + '/animate-css'
  ]);
});

// == dl-resources task: getting necessary resources
gulp.task('dl-resources', function() {
  return plugins.bower({ interactive: true})
      .on('error', function (err) { plugins.util.log(plugins.util.colors.bold.red(err)); this.emit('end'); })
    .pipe(gulp.dest(cfg.dirs.comps))
});

// == copy-resources task: copy resources and rename some of them
gulp.task('copy-resources', function() {
  // Basic js files
  var jsUtils = gulp.src([
      cfg.dirs.comps + '/jquery/dist/jquery{,.min}.js',
      cfg.dirs.comps + '/jquery-migrate/jquery-migrate{,.min}.js',
      cfg.dirs.comps + '/jquery-easing/jquery.easing{,.min}.js',
      cfg.dirs.comps + '/respondjs/dest/respond{.src,.min}.js',
      cfg.dirs.comps + '/html5shiv/dist/html5shiv-printshiv{,.min}.js'
    ])
    .pipe(plugins.plumber())
    .pipe(plugins.rename(function(res) {
      res.basename = res.basename.replace(/(-printshiv|\.src)/g, '');
      return res;
    }))
    .pipe(gulp.dest(cfg.dirs.distJs));
  // Less or sass depending on choosen preprocessor
  if (cfg.cssCompiler === 'less') {
    // Bootstrap less files
    var bsSrcs = gulp.src([ cfg.dirs.comps + '/bootstrap/less/**/*' ])
      .pipe(plugins.plumber())
      .pipe(gulp.dest(cfg.dirs.srcLess + '/bootstrap'));
    // Font Awesome less files
    var faSrcs = gulp.src([ cfg.dirs.comps + '/font-awesome/less/**/*' ])
      .pipe(plugins.plumber())
      .pipe(gulp.dest(cfg.dirs.srcLess + '/fontawesome'));
    // Lato Font less file
    var lfSrcs = gulp.src([ cfg.dirs.comps + '/lato-webfont/src/lato-font.less' ])
      .pipe(plugins.plumber())
      .pipe(gulp.dest(cfg.dirs.srcLess));
    // Josefin Sans Font less file
    var josefineSrcs = gulp.src([ cfg.dirs.comps + '/josefinsans-webfont/src/josefin-sans-font.less' ])
      .pipe(plugins.plumber())
      .pipe(plugins.rename('josefinsans-font.less'))
      .pipe(gulp.dest(cfg.dirs.srcLess));
  } else {
    // Bootstrap sass files (v.3+)
    var bsSrcs = gulp.src([
      cfg.dirs.comps + '/bootstrap-sass/assets/stylesheets/**/*',
      '!' + cfg.dirs.comps + '/bootstrap-sass/assets/stylesheets/_bootstrap-{compass,mincer,sprockets}.scss'
      ])
      .pipe(plugins.plumber())
      .pipe(gulp.dest(cfg.dirs.srcSass));
    // Bootstrap sass files (v.4+)
    // var bsSrcs = gulp.src([ cfg.dirs.comps + '/bootstrap/scss/**/*' ])
    //   .pipe(plugins.plumber())
    //   .pipe(gulp.dest(cfg.dirs.srcSass + '/bootstrap'));
    // Font Awesome sass files
    var faSrcs = gulp.src([ cfg.dirs.comps + '/font-awesome/scss/**/*' ])
      .pipe(plugins.plumber())
      .pipe(gulp.dest(cfg.dirs.srcSass + '/fontawesome'));
    // Lato Font sass file
    var lfSrcs = gulp.src([ cfg.dirs.comps + '/lato-webfont/src/lato-font.scss' ])
      .pipe(plugins.plumber())
      .pipe(plugins.rename('_lato-font.scss'))
      .pipe(gulp.dest(cfg.dirs.srcSass));
    // Josefin Sans Font sass file
    var josefineSrcs = gulp.src([ cfg.dirs.comps + '/josefinsans-webfont/src/josefin-sans-font.scss' ])
      .pipe(plugins.plumber())
      .pipe(plugins.rename('_josefinsans-font.scss'))
      .pipe(gulp.dest(cfg.dirs.srcSass));
  }
  // Fonts
  var webFonts = gulp.src([
      cfg.dirs.comps + '/bootstrap/dist/fonts/*.{eot,svg,woff,woff2,ttf,otf}',
      cfg.dirs.comps + '/lato-webfont/dist/fonts/*.{eot,svg,woff,woff2,ttf,otf}',
      cfg.dirs.comps + '/josefinsans-webfont/dist/fonts/*.{eot,svg,woff,woff2,ttf,otf}',
      cfg.dirs.comps + '/font-awesome/fonts/*.{eot,svg,woff,woff2,ttf,otf}',
      cfg.dirs.srcFonts + '/*.{eot,svg,woff,woff2,ttf,otf}'
    ])
    .pipe(plugins.plumber())
    .pipe(gulp.dest(cfg.dirs.distFonts));
  // Html, htaccess, robots
  var webDocs = gulp.src([
      cfg.dirs.srcTpl + '/index.html',
      cfg.dirs.srcTpl + '/styleguide.html',
      cfg.dirs.srcTpl + '/.htaccess',
      cfg.dirs.srcTpl + '/robots.txt'
    ])
    .pipe(plugins.plumber())
    .pipe(gulp.dest(cfg.dirs.distBase));
  // Global images and icons
  var gImages = gulp.src([ cfg.dirs.srcImgGlobal + '/**/*.{jpg,jpeg,png,gif,bmp,ico,svg}' ])
    .pipe(plugins.plumber())
    .pipe(plugins.newer(cfg.dirs.distImg))
    .pipe(plugins.imagemin(cfg.imageMinOptions))
      .on('error', function (err) { plugins.util.log(plugins.util.colors.bold.red(err)); this.emit('end'); })
    .pipe(gulp.dest(cfg.dirs.distImg));
  // Content images
  var cImages = gulp.src([ cfg.dirs.srcImgContent + '/**/*.{jpg,jpeg,png,gif,bmp,svg}' ])
    .pipe(plugins.plumber())
    .pipe(plugins.newer(cfg.dirs.distContent))
    .pipe(plugins.imagemin(cfg.imageMinOptions))
      .on('error', function (err) { plugins.util.log(plugins.util.colors.bold.red(err)); this.emit('end'); })
    .pipe(gulp.dest(cfg.dirs.distContent));

  // Return streams
  return plugins.merge(jsUtils, bsSrcs, faSrcs, lfSrcs, webFonts, webDocs, gImages, cImages);
});

// == jshint-src task: validate JS sources and gulpfile through jshint
gulp.task('jshint-src', function() {
  return gulp.src([
      cfg.dirs.srcJS + '/**/*.js',
      './gulpfile.js'
    ])
    .pipe(plugins.plumber())
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

// == jshint-dist task: validate compiled JS through jshint
gulp.task('jshint-dist', function() {
  return gulp.src([ cfg.dirs.distJs + '/**/*.js' ])
    .pipe(plugins.plumber())
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

// == compile-js task: concatenating and minifying JS files
gulp.task('compile-js', function() {
  // Outputs non-minified and minified main.js file
  var mainJS = gulp.src([
      cfg.dirs.srcJsMain + '/*.js',
      '!' + cfg.dirs.srcJsMain + '/04.parallax.js',     // Stellar not included in plugins
      '!' + cfg.dirs.srcJsMain + '/07.flexslider.js',   // Flex slider not included in plugins
      '!' + cfg.dirs.srcJsMain + '/08.slickslider.js',  // Slick slider not included in plugins
      '!' + cfg.dirs.srcJsMain + '/09.jssorslider.js',  // Jssor slider not included in plugins
      '!' + cfg.dirs.srcJsMain + '/10.colorbox.js',     // Colorbox not included in plugins
      '!' + cfg.dirs.srcJsMain + '/12.livereload.js'    // LiveReload snippet as BrowserSync is used
    ])
    .pipe(plugins.plumber())
    .pipe(plugins.concat('main.js'))
    .pipe(plugins.header(bannerFile + '$(function() {\n\n', { pkg : pkg } ))
    .pipe(plugins.footer('\n});'))
    .pipe(gulp.dest(cfg.dirs.distJs))
    .pipe(plugins.uglify(cfg.uglifyOptions))
      .on('error', function (err) { plugins.util.log(plugins.util.colors.bold.red(err)); this.emit('end'); })
    .pipe(plugins.rename({ extname : '.min.js' }))
    .pipe(gulp.dest(cfg.dirs.distJs));

  // Outputs non-minified and minified stylesguide.js file
  var sgJS = gulp.src([
      cfg.dirs.comps + '/holderjs/holder.js',
      cfg.dirs.srcJsSg + '/**/*.js'
    ])
    .pipe(plugins.plumber())
    .pipe(plugins.concat('styleguide.js'))
    .pipe(plugins.header(bannerFile + '\n\n', { pkg : pkg } ))
    .pipe(gulp.dest(cfg.dirs.distJs))
    .pipe(plugins.uglify(cfg.uglifyOptions))
      .on('error', function (err) { plugins.util.log(plugins.util.colors.bold.red(err)); this.emit('end'); })
    .pipe(plugins.rename({ extname : '.min.js' }))
    .pipe(gulp.dest(cfg.dirs.distJs));

  // Custom plugins stream
  var pluginsJStream = gulp.src([
    cfg.dirs.comps + '/html5boilerplate/dist/js/plugins.js',
    cfg.dirs.srcJsPlugins + '/**/*.js',
    // cfg.dirs.comps + '/one-page-nav/jquery.nav.js',          // No need for it with bootstrap scrollspy
    // cfg.dirs.comps + '/jquery-colorbox/jquery.colorbox.js',
    // cfg.dirs.comps + '/slick-carousel/slick/slick.js',
    // cfg.dirs.comps + '/flex-slider/jquery.flexslider.js',
    // cfg.dirs.comps + '/stellar/jquery.stellar.js',
    '!' + cfg.dirs.srcJsPlugins + '/gmaps.js',                 // Exclude in this case
    '!' + cfg.dirs.srcJsPlugins + '/fbsdk.js',                 // Exclude in this case
    '!' + cfg.dirs.srcJsPlugins + '/chkjs.js'                  // Exclude if jQuery is used to do it
  ]);

  // Create array of streams for Bootstrap JS
  var twbsJsStream = [], i = 0;
  for (var key in cfg.twbsJs) {
    if (cfg.twbsJs[key] === true) {
      if (i === 0) { // Add Bootstrap jQuery check at the beginning
        twbsJsStream[i] = gulp.src(cfg.dirs.comps + '/bootstrap/js/' + key)
          .pipe(plugins.plumber())
          .pipe(plugins.header('// == Bootstrap jQuery check\n' + jqueryChk + jqueryVerChk, { pkg : pkg } ));
      } else {
        twbsJsStream[i] = gulp.src(cfg.dirs.comps + '/bootstrap/js/' + key);
      }
      i++;
    }
  }

  // Outputs non-minified and minified plugins.js file
  var pluginsJS = plugins.merge(pluginsJStream, twbsJsStream)
    .pipe(plugins.plumber())
    .pipe(plugins.concat('plugins.js'))
    .pipe(plugins.header(bannerFile + '\n', { pkg : pkg } ))
    .pipe(gulp.dest(cfg.dirs.distJs))
    .pipe(plugins.uglify(cfg.uglifyOptions))
      .on('error', function (err) { plugins.util.log(plugins.util.colors.bold.red(err)); this.emit('end'); })
    .pipe(plugins.rename({ extname : '.min.js' }))
    .pipe(gulp.dest(cfg.dirs.distJs));

  // Return streams
  return plugins.merge(mainJS, sgJS, pluginsJS);
});

// == compile-sass task: compiling sass to css
gulp.task('compile-sass', function() {
  // Sources for main.css
  var sassMain = gulp.src([ cfg.dirs.srcSass + '/main.scss', cfg.dirs.srcSass + '/styleguide.scss' ]);
  // Sources for Bootstrap theme (fixing gulp-sass problem with compiling partials)
  var sassBsTheme = gulp.src([ cfg.dirs.srcSass + '/bootstrap/_theme.scss' ])
    .pipe(plugins.rename('theme.scss'));
  // Outputs non-minified and minified stylesheets
  return plugins.merge(sassMain, sassBsTheme)
    .pipe(plugins.plumber())
    .pipe(plugins.sass(cfg.sassOptionsDev))
      .on('error', function (err) { plugins.util.log(plugins.util.colors.bold.red(err)); this.emit('end'); })
    .pipe(plugins.autoprefixer(cfg.autoprefixerOptions))
    .pipe(plugins.header(bannerFile, { pkg : pkg } ))
    .pipe(gulp.dest(cfg.dirs.distCss))
    .pipe(plugins.sass(cfg.sassOptionsProd))
      .on('error', function (err) { plugins.util.log(plugins.util.colors.bold.red(err)); this.emit('end'); })
    .pipe(plugins.rename({ extname : '.min.css' }))
    .pipe(plugins.autoprefixer(cfg.autoprefixerOptions))
    .pipe(gulp.dest(cfg.dirs.distCss));
});

// == compile-less task: compiling less to css
gulp.task('compile-less', function() {
  // Outputs non-minified and minified stylesheets
  return gulp.src([
      cfg.dirs.srcLess + '/main.less',
      cfg.dirs.srcLess + '/bootstrap/theme.less'
    ])
    .pipe(plugins.plumber())
    .pipe(plugins.less(cfg.lessOptionsDev))
    .pipe(plugins.header(bannerFile, { pkg : pkg } ))
      .on('error', function (err) { plugins.util.log(plugins.util.colors.bold.red(err)); this.emit('end'); })
    .pipe(gulp.dest(cfg.dirs.distCss))
    .pipe(plugins.less(cfg.lessOptionsProd))
      .on('error', function (err) { plugins.util.log(plugins.util.colors.bold.red(err)); this.emit('end'); })
    .pipe(plugins.rename({ extname : '.min.css' }))
    .pipe(gulp.dest(cfg.dirs.distCss));
});

// == process-css task: autoprefix and minify css files
gulp.task('process-css', function() {
  return gulp.src([
      cfg.dirs.distCss + '/**/*.css',
      "!" + cfg.dirs.distCss + "/**/*.min.css"
    ])
    .pipe(plugins.plumber())
    .pipe(plugins.autoprefixer(cfg.autoprefixerOptions))
    .pipe(gulp.dest(cfg.dirs.distCss))
    .pipe(plugins.cleanCSS(cfg.cleanCssOptions))
      .on('error', function (err) { plugins.util.log(plugins.util.colors.bold.red(err)); this.emit('end'); })
    .pipe(plugins.rename({ extname : '.min.css' }))
    .pipe(gulp.dest(cfg.dirs.distCss));
});

// == build-css task: compile sass or less to css
if (cfg.cssCompiler === 'sass') {
  gulp.task('build-css', ['compile-sass']);
} else if (cfg.cssCompiler === 'less') {
  gulp.task('build-css', ['compile-less']);
} else {
  gulp.task('build-css', ['process-css']);
}

// == optimize-img task: optimize images
gulp.task('optimize-img', function(){
  // Global images and icons
  var globalImages = gulp.src([ cfg.dirs.srcImgGlobal + '/**/*.{jpg,jpeg,png,gif,bmp,ico,svg}' ])
    .pipe(plugins.plumber())
    .pipe(plugins.newer(cfg.dirs.distImg))
    .pipe(plugins.imagemin(cfg.imageMinOptions))
      .on('error', function (err) { plugins.util.log(plugins.util.colors.bold.red(err)); this.emit('end'); })
    .pipe(gulp.dest(cfg.dirs.distImg));
  // Content images
  var contentImages = gulp.src([ cfg.dirs.srcImgContent + '/**/*.{jpg,jpeg,png,gif,bmp,svg}' ])
    .pipe(plugins.plumber())
    .pipe(plugins.newer(cfg.dirs.distContent))
    .pipe(plugins.imagemin(cfg.imageMinOptions))
      .on('error', function (err) { plugins.util.log(plugins.util.colors.bold.red(err)); this.emit('end'); })
    .pipe(gulp.dest(cfg.dirs.distContent));

  // Return streams
  return plugins.merge(globalImages, contentImages);
});

// == browser-sync task: start the built-in server & watch files triggering page reload
gulp.task('browser-sync', function() {
  bs.init({
    browser: ["firefox"],  // ["firefox", "google chrome", "opera", "vivaldi"]
    files: [
      cfg.dirs.distBase + '/*.{html,htaccess,php}',
      cfg.dirs.distCss + '/*.css',
      cfg.dirs.distJs + '/*.js',
      cfg.dirs.distFonts + '/*.{eot,svg,woff,woff2,ttf,otf}',
      cfg.dirs.distImg + '/*.{png,jpg,jpeg,gif,bmp,ico,svg}',
      cfg.dirs.distContent + '/*.{png,jpg,jpeg,gif,bmp,svg}',
      "!" + cfg.dirs.distBase + "/**/*.map"
    ],
    // host: "192.168.1.1",
    // https: true,
    injectChanges: false, // Do not inject, just reload the page
    open: true,           // or "local"
    port: cfg.ports.bsDefault,
    server: {
      directory: false,
      baseDir: [cfg.dirs.distBase],
    },
    // tunnel: true,     // view local site at a public URL
    ui: {
      port: cfg.ports.bsUI,
      weinre: {
        port: cfg.ports.beta
      }
    }
  });
});

// == watch task: run tasks on changes for selected resources
gulp.task('watch', function() {

  // Watch for changes in JS files
  gulp.watch([
    cfg.dirs.srcJsMain + '/*.js',
    cfg.dirs.srcJsPlugins + '/*.js',
    cfg.dirs.srcJsSg + '/*.js'
  ], ['compile-js']);

  // Watch for new/changed images
  gulp.watch([
    cfg.dirs.srcImgGlobal + '/**/*.{jpg,jpeg,png,gif,bmp,ico,svg}',
    cfg.dirs.srcImgContent + '/**/*.{jpg,jpeg,png,gif,bmp,svg}'
  ], ['optimize-img']);

  // Watch for changes in sass or less sources
  if (cfg.cssCompiler === 'sass') {
    gulp.watch(cfg.dirs.srcSass + '/**/*.scss', ['compile-sass']);
  } else if (cfg.cssCompiler === 'less') {
    gulp.watch(cfg.dirs.srcLess + '/**/*.less', ['compile-less']);
  }
});

// == default task: lists all the available tasks using `gulp --tasks-simple` (can be changed to `gulp --tasks`)
gulp.task('default', function() {
  exec('gulp --tasks-simple', function (err, stdout, stderr) {
    plugins.util.log(plugins.util.colors.bold.cyan('Available tasks are:\n') + plugins.util.colors.cyan(stdout));
  });
});

// ==============================================
// === Combo tasks
// ==============================================

// == clean-up task
gulp.task('clean-up', ['clean-comps', 'clean-res']);

// == init-assets task
gulp.task('init-assets', ['compile-js', 'build-css', 'optimize-img']);

// == watcher task
gulp.task('watcher', function() {
  plugins.runSequence('init-assets', 'watch', 'browser-sync');
});

// == init-project task
gulp.task('init-project', function() {
  plugins.runSequence('clean-up', 'dl-resources', 'copy-resources');
});

// == build task
gulp.task('builder', function() {
  plugins.runSequence('clean-up', 'dl-resources', 'copy-resources', 'init-assets', 'watcher');
});
