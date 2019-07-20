module.exports = function (grunt) {

	grunt.initConfig({
		//SASS
		sass: {
			dist: {
				files: {
					'css/style.css': 'sass/style.scss'
				}
			}
		},

		//		WATCH
		watch: {
			styles: {
				files: ['sass/**/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false,
				},
			},
		},
		//		browserSync

		browserSync: {
			bsFiles: {
				src: ['css/*.css', "**/*.*"]
			},
			options: {
				watchtask: false,
				server: {
					baseDir: "./"
				}
			}
		},
		
/*				//POSTCSS
				postcss: {
					options: {
						processors: [
		              require('autoprefixer')({
								browsers: ['last 2 versions']

							}),
							require('cssnano')({
								preset: 'default',
							})
		            ]
					},
					dist: {
						src: 'source/css/style.css',
						dest: 'source/css/style-min.css',
					}

				},*/

		//COPY
		copy: {
			main: {
				files: [
					{
						expand: true,
						src: ['img/*', "fonts/*", "css/reset.css"],
						dest: '../build'
							},
		    		],
			},
		},

		//CLEAN
		clean: {
			options: {
				force: true
			},
			build: ["../build/"]
		}

	});
	grunt.loadNpmTasks('grunt-csso');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
};
