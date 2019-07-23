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
                        overrideBrowserslist: ['last 2 versions']

                    }),
        							require('cssnano')({
                        preset: 'default',
                    })
        		            ]
            },
            dist: {
                src: 'build/css/style.min.css',
                dest: 'build/css/style.min.css',
            }

        },

        //        IMAGE

        image: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['img/*.{png,jpg,svg}'],
                    dest: 'build/'
        }]
            }
        },

        //        UNCSS
        uncss: {
            dist: {
                files: [
                    {
                        src: 'index.html',
                        dest: 'build/css/style.min.css'
                    }
                ]
            }
        },

        //COPY
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ["fonts/*", "js/*", "index.html"],
                        dest: 'build/'
							},
		    		],
            },
        },

        //CLEAN
        clean: {
            options: {
                force: true
            },
            build: ["build/**/*.*"]
        }

    });
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-image');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask("css", ["uncss", "postcss"]);
    grunt.registerTask("build", ["clean", "uncss", "postcss", "image", "copy"]);
};
