module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
    		all: ['Gruntfile.js', 'src/**/*.js']
  		},
  		clean: ["dist"],
  		copy: {
			main: {
			    files: [
			      {expand: true, cwd: 'src/', src: ['**'], dest: 'dist/'},
			      {expand: true, cwd: 'bower_components/highlightjs', src: ['highlight.pack.js', 'styles/**'], dest: 'dist/js/lib/highlight'},
			      {expand: true, flatten: true, src: ['bower_components/domwork/dist/domwork.js'], dest: 'dist/js/lib'}
			    ]
			  }
  		},
		watch: {
			config: {
				files: ['src/config.json'],
			    tasks: ['build'],
			    options: {
			      spawn: false,
			      livereload: true,
			    },
			},
		  scripts: {
		    files: ['src/**/*.js'],
		    tasks: ['build'],
		    options: {
		      spawn: false,
		      livereload: true,
		    },
		  },
		  styles: {
		    files: ['src/**/*.css'],
		     tasks: ['build'],
		    options: {
		      livereload: true,
		    },
		  },
		  html: {
		  	files: ['src/index.html'],
		  	 tasks: ['build'],
		  	options: {
      			livereload: true,
    		},
		    /*tasks: ['test'],*/
		  }
		},
		connect: {
		    server: {
		      options: {
		        port: 8000,
		        base: 'dist'
		      }
		    }
		},
		'gh-pages': {
            options: {
                base: 'dist/'
            },
            src: ['**/*']
        },
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-gh-pages');

	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('build', ['jshint', 'clean', 'copy']);
	grunt.registerTask('default', ['jshint', 'build', 'connect', 'watch']);
	grunt.registerTask('deploy', ['build', 'gh-pages']);

};