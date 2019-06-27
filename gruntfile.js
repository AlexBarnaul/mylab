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

		//POSTCSS
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

		},

		//UNCSS
		uncss: {
			dist: {
				files: {
					"source/css/style.css": ["source/*.html"]
				}
			}
		},

		//SVGSTORE
		svgstore: {
			options: {},
			default: {
				files: {
					'source/img/sprite-photo.svg': ['source/img/spritePhoto/*.svg'],
				},
			},
		},

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
		},

		//POSTHTML
		posthtml: {
			options: {
				use: [require('posthtml-include')({
					encoding: 'utf-8'
				})]
			},
			build: {
				files: [{
					expand: true,
					src: ['*.html'],
					dest: '../build/'
		        }]
			}
		},


		//CWEBP 
		cwebp: {
			/*			 static: {
			 	files: {
			 		'dist/img-png.webp': 'src/img.png',
			 		'dist/img-jpg.webp': 'src/img.jpg',
			 		'dist/img-gif.webp': 'src/img.gif'
			 	}
			 },*/
			dynamic: {
				options: {
					q: 85
				},
				files: [{
					expand: true,
					cwd: 'source/img/',
					src: ['source/**/*.{png,jpg}'],
					dest: 'source/img/webp'
        }]
			}
		},

		//IMAGEMIN
		imagemin: {
			images: {
				options: {
					optimizationLevel: 7,
					progressive: true
				},
				files: [{
					expand: true,
					src: ["source/img/*.{jpg,png}"],
					dest: "."
 }]
			}
		}


	});
	grunt.loadNpmTasks('grunt-juwain-posthtml');
	grunt.loadNpmTasks('grunt-cwebp');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-svgstore');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
};
