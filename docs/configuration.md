# Configuration

Configuration is a kind of overkill on puprpose. It is ment to be adjusted per specific project.  
Options are placed in separate `config.json` file to avoid further overloading of the `gulpfile.js`.

-  `dirs` - directories structure for project
-  `ports` - ports used for live reloading
-  `pluginsOptions` - `gulp-load-plugins` options
-  `autoprefixerOptions` - `gulp-autoprefixer` options
-  `cleanCssOptions` - `gulp-clean-css` options
-  `sassOptionsDev`/`sassOptionsProd` - `gulp-sass` options
-  `lessOptionsDev`/`lessOptionsProd` - `gulp-less` options
-  `imageMinOptions` - `gulp-imagemin` options
-  `uglifyOptions` - `gulp-uglify` options
-  `cssCompiler` - string: `sass` - compile scss files (default), `less` - compile less files,
   `none` (or any other value) - assumes only minification of css file is required).
-  `banners` - banners which can be added to concatenated files (only unminified, minified files have no comments).
-  `twbsJs` - object of bootstrap JavaScript plugins concatenated in correct order, set value of `plugin-name.js` to `false` to exclude desired plugin, make sure you know plugin dependency (some plugins require others to be included), if you set all to false, none of Bootstrap JavaScript will be included into your `plugins.js`, same goes for `jqueryCheck` and `jqueryVersionCheck`.
-  `jqueryCheck` and `jqueryVersionCheck` - taken from Bootstrap `configBridge.json` - if any Bootstrap JavaScript plugin is required, then both of them are added at the top (none of them is if you set every Bootstrap JavaScript plugin to `false`).

There are also three more files included in `extras` directory:
01. Default configuration file (no option is changed) from [Bootstrap cusomization page](http://getbootstrap.com/customize/): [bootstrapConfig.json](./extras/bootstrapConfig.json).
02. Default configuration file taken from __Bootstrap v3.3.7__ `grunt` folder: [configBridge.json](./extras/configBridge.json).
03. Additional tasks to optionally add to `gulpfile.js`: [additional-tasks.js](./extras/additional-tasks.js)).
