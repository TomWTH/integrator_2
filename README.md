# Integrator II
adapts Toinux's Integrator (https://github.com/toinux/integrator)



## Pre-requisites
- [nodejs](https://nodejs.org/)

## Installation

```Shell
npm install -g grunt-cli (install grunt globaly)
npm install (install modules listed in package.json in node_modules folder)

(npm install grunt-postcss pixrem autoprefixer cssnano --save-dev (install postCss plugins => space between plugins' names) )

```

## Customization

Edit `config.json` with your environment values.
Values in `config.json` will override those of `Gruntfile.js`.

i.e : 

```json
{
	"cfg" : {
		"sass" : "repertoire_sass",
		"css" : "repertoire_css",
		"host" : "foo.bar",
		"site" : "http://www.foo.bar"
	},
	"sass" : {
		"options" : {
			"outputStyle" : "nested",
			"sourceMap": true
		}
	}
}
```

- sass : Sass-files source folder
- css : Css-files source folder (& source maps)
- site : URL you want to test with [browser sync](http://www.browsersync.io/)

## Execution

	grunt [task] --sass=<sass_directory> --css=<css_directory> [--site=<site_url>]

> sass, css and site params could be declared in `config.json`

## Tasks

### sass
Compiles sass files from specified sass folder + generates sourceMap file

### watch
Watches files modifications (here, files from sass folder, can watch other folders)

### sassWatch
Runs sass + watch

### browserSync
Runs site localy in browser and reload page when files in specified folder change (here, reload only css => doesn't reload data)

### bs
Runs browserSync + sassWatch

### postcss
[Postprocess](https://github.com/nDmitry/grunt-postcss) css files and their sourcemap.
Here, we use Pixrem (CSS post-processor that generates pixel fallbacks for rem units), Autoprefixer(Parse CSS and add vendor prefixes to CSS rules using values from the Can I Use website) and Cssnano (minify css files).
Run this task after dev-time for final css result.