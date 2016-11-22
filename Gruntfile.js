'use strict';

module.exports = function(grunt) {



	grunt.initConfig({
		watch: {
			sass: {
				files: ['*.scss'],
				tasks: ['sass']

			},
			options: {
				cwd:'<%= cfg.sass %>',
				spawn:false,
				interrupt:true,
				livereload:35729, 
				livereloadOnError: false,
				dateFormat: function(time) {
									grunt.log.write(grunt.template.today("[HH:MM:ss] "));
									grunt.log.writeln('Execution en '+(''+time).green.bold+' ms');
								}
			}
		},

		sass: {
			app: {
				files: [{
					expand: true,
					cwd: '<%= cfg.sass %>',
					src: ['*.scss'],
					dest: '<%= cfg.css %>',
					ext: '.css'
				}]
			},
			// Voir https://github.com/sass/node-sass#options pour toutes les operations
			options: {
				sourceMap: true
			}
		},
		
		postcss: {
			options: {
				map: true, // sourcemaps
				processors: [
				require('pixrem')(), // add fallbacks for rem units, cf https://github.com/robwierzbowski/node-pixrem pour les browers supportés
				require('autoprefixer')({browsers: 'last 2 versions'}),
				require('cssnano')() // minify the result
				]
			},
			dist: {
				src: '<%= cfg.css %>/*.css'
			}
		},

		browserSync: {
			dev: {
				bsFiles: {
					src : '<%= cfg.css %>/*.css'
				},
				options: {
					watchTask: true,
					open:"external",
					host:"<%= cfg.host %>",
					proxy: {
						target: "<%= cfg.site %>"
					}
				}
			}
		}
	});

	// lecture du fichier de configuration
	if (grunt.file.exists('config.json')) {
		grunt.config.merge(grunt.file.readJSON('config.json'));
	}

	// --sass=..., --css=... et --site=... sont prioritaires par rapport au fichier de configuration
	var options = {};
	['sass','css', 'site'].forEach(function(arg) {
		if (grunt.option(arg)) {
			options[arg] = grunt.option(arg);
		}
	});

	// mise à jour de la configuration par rapport aux options passées en ligne de commande
	grunt.config.merge({
		cfg: options
	});

	var cfg = grunt.config.get('cfg');
	var sass = cfg.sass || grunt.fail.fatal("option --sass=<repertoire> manquant");
	var css = cfg.css || grunt.fail.fatal("option --css=<repertoire> manquant");
	var site = cfg.site;

	grunt.file.isDir(sass) || grunt.fail.fatal("repertoire '"+sass+"' inexistant");
	grunt.file.isDir(css) || grunt.fail.warn("repertoire '"+css+"' inexistant");

	grunt.log.write("Répertoire source      : ").writeln(sass.cyan);
	grunt.log.write("Répertoire destination : ").writeln(css.cyan);
	grunt.log.write("Site web               : ").writeln(site ? site.cyan : "non défini".yellow);

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.registerTask('sassWatch', ['sass', 'watch']);
	grunt.registerTask('bs', ['browserSync', 'sassWatch']);

};