# Available tasks and their usage

Tasks in the `gulpfile.js` are split into two groups.

## Standalone tasks
Run separately from CLI.

### clean-comps
Run `gulp clean-comps` from CLI.  
Removing `components` directory. Any other directory to remove can be added.

### clean-res
Run `gulp clean-res` from CLI.  
Removing specified assets and sources.

### dl-resources
Run `gulp dl-resources`from CLI (interactive answer is `3`).  
Getting necessary resources (in this case only via `bower` but git cloning can be added - see [additional tasks](../docs/extras/additional-tasks.js)).

### copy-resources
Run `gulp copy-resources` from CLI.  
Copy resources and rename some of them.

### jshint-src
Run `gulp jshint-src` from CLI.  
Validate JavaScript sources and gulpfile through `jshint` - this task is completely 'standalone' and is not a part of any 'combo' task.

### jshint-dist
Run `gulp jshint-dist` from CLI.  
Validate JavaScript sources through `jshint` - this task is completely 'standalone' and is not a part of any 'combo' task.

### minify-js
Run `gulp minify-js` from CLI.  
Minifies unminified JavaScript files in `dist/assets/js`.

### compile-js
Run `gulp compile-js` from CLI.  
Concatenating and minifying JavaScript files task is splited in two 'parts'. First 'part' takes parials for main JavaScript file, concatenates them into `main.js` and then minifies it to `main.min.js`. Second 'part' takes partials for plugins and concatenates them with other plugins specified into `plugins.js` and then minifies it to `plugins.min.js`. If any of Bootstrap plugins in [configuration file](configuration.md) is set to `true`, the Bootstrap JavaScript plugins and jQuery check are also included.

### compile-sass
Run `gulp compile-sass` from CLI.  
Compiling sass to css. Output files are `main.css` and `main.min.css` (for all styles) + `theme.css` and `theme.min.css` (for Bootstrap theme).

### compile-less
Run `gulp compile-less` from CLI.  
__Important__: does not work for the moment, configuration needs fixing.  
Compiling less to css. Output files are `main.css` and `main.min.css` (for all styles) + `theme.css` and `theme.min.css` (for Bootstrap theme).

### process-css
Run `gulp process-css` from CLI.  
Autoprefix and minify css files. It assumes the `main.css` is already present in `dist/assets/css` and takes it as a source.

### build-css
Run `gulp build-css` from CLI.  
Compile sass/less to css or only autoprefix and minifies existing stylesheets depending on `cssCompiler` in [configuration file](configuration.md).

### optimize-img
Run `gulp optimize-img` from CLI.  
Optimize images - this task is completely 'standalone' and is not a part of any 'combo' task.

### browser-sync
Run `gulp browser-sync` from CLI.  
Start the built-in server and watch files triggering page reload.

### watch
Run `gulp watch` from CLI.  
Watch files for changes and compile if changes appear. It only watches sass/less sources and JavaScript files in `dist/assets/js` and does not reload the page, as the changes in other files are beeing watched by `browser-sync` which also handles page reloading, so adding it here would be redutant.

### default
Run `gulp` from CLI.  
To avoid various mistakes this task only lists all the available tasks using `gulp --tasks-simple`.

---

## Combo tasks
Run tasks in parallel or series/sequences with aliases from CLI.

### watcher
Run it from CLI typing `gulp watcher`.  
Subtasks, running in parallel: `browser-sync` and `watch`.

### clean-up
Run it from CLI typing `gulp clean-up`.  
Subtasks, running in parallel: `clean-comps` and `clean-res`.

### init-assets
Run it from CLI typing `gulp init-assets`.  
Subtasks, running in parallel: `compile-js` and `build-css`.

### init-project
Run it from CLI typing `gulp init-project`.  
Subtasks, running in sequence (using `run-sequence`) in this order: `clean-up`, `dl-resources`, `copy-resources`.

### builder
Run it from CLI typing `gulp builder`.  
Subtasks, running in sequence - in this order: `clean-up`, `dl-resources`, `copy-resources`, `init-assets`, `watcher`.

It will do all the following:
01. Run `gulp init-project` - it will remove old `components` folder and all sources copied from it and also it will remove all files is `dist`, what gives a kind of 'clean start', then download all specified resources and copy selected resources to specified directories.
02. Run `gulp init-assets` - it will compile CSS and JavaScript.
03. Run `gulp watcher` it will start a server, open your project in specified browser(s) and watch for changes while you work to compile files and reload browser(s) in background.
