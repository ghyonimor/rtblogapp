module.exports = function (grunt) {
	'use strict';

	// Display the elapsed execution time of grunt tasks
	require('time-grunt')(grunt);
	// Load all grunt-* packages from package.json
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		// Read settings from package.json
		pkg: grunt.file.readJSON('package.json'),
		// Paths settings
		dirs: {
			src: {
				js: 'public/app',
				css: 'public/css'
			},
			dest: {
				dest: 'public/public',
				css: 'public/public/css',
				js: 'public/public/js'
			}
		},

		express: {
		    options: {
		      // Override defaults here
		    },
		    dev: {
		      options: {
		        script: 'server.js'
		      }
		    },
		    prod: {
		      options: {
		        script: 'server.js',
		        node_env: 'production'
		      }
		    },
		    test: {
		      options: {
		        script: 'server.js'
		      }
		    }
		},
		// Check that all JS files conform to our `.jshintrc` files
		jshint: {
			options: {
				jshintrc: true
			},
			target: {
				src: '<%= dirs.src.js %>/**/*.js'
			}
		},
		// Combine all JS files into one compressed file (including sub-folders)
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> ' +
					'<%= grunt.template.today("dd-mm-yyyy") %> */\n',
				compress: true,
				mangle: true,
				sourceMap: true
			},
			target: {
				src: ['<%= dirs.src.js %>/**/app.js', '<%= dirs.src.js %>/**/navctrl.js',
				'<%= dirs.src.js %>/**/searchctrl.js', '<%= dirs.src.js %>/**/postsctrl.js',
				'<%= dirs.src.js %>/**/postctrl.js', '<%= dirs.src.js %>/**/adminctrl.js',
				'<%= dirs.src.js %>/**/postsservice.js', '<%= dirs.src.js %>/**/navservice.js',
				'<%= dirs.src.js %>/**/activeservice.js', '<%= dirs.src.js %>/**/sanitizeservice.js',
				'<%= dirs.src.js %>/**/filtersctrl.js', '<%= dirs.src.js %>/**/filterposts.js',
				'<%= dirs.src.js %>/**/newctrl.js', '<%= dirs.src.js %>/**/editctrl.js',
				'<%= dirs.src.js %>/**/saveservice.js', '<%= dirs.src.js %>/**/markdown.js'],
				dest: '<%= dirs.dest.js %>/main.min.js'
			}
		},
		// Compile the main Sass file (that loads all other Sass files)
		// Output as one compressed file
		sass: {
			options: {
				outputStyle: 'compressed',
				sourceMap: true
			},
			target: {
				src: '<%= dirs.src.css %>/main.scss',
				dest: '<%= dirs.dest.css %>/main.min.css'
			}
		},
		// Cleanup setup, used before each build
		clean: {
			all: '<%= dirs.dest.dest %>',
			css: '<%= dirs.dest.css %>',
			js: '<%= dirs.dest.js %>'
		},

		// Trigger relevant tasks when the files they watch has been changed
		// This includes adding/deleting files/folders as well
		watch: {
			configs: {
				options: {
					reload: true
				},
				files: ['Gruntfile.js', 'package.json']
			},
			css: {
				files: '<%= dirs.src.css %>/**/*.scss',
				tasks: ['build-css']
			},
			js: {
				files: '<%= dirs.src.js %>/**/*.js',
				tasks: ['build-js']
			},
			index: {
				files: 'index.html'
			},
			express: {
		      files:  [ '<%= dirs.src.js %>/**/*.js' ],
		      tasks:  [ 'express:dev' ],
		      options: {
		        spawn: false
		      }
		    }
		}
	});

	// Setup build tasks aliases
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-livereload');
	grunt.registerTask('build-js', ['clean:js', 'jshint', 'uglify']);
	grunt.registerTask('build-css', ['clean:css', 'sass']);
	grunt.registerTask('build', ['clean:all', 'build-js', 'build-css']);

	// Open local server and watch for file changes
	grunt.registerTask('serve', ['express', 'watch']);

	// Default task(s).
	grunt.registerTask('default', ['build']);
};
