var path = require('path');

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            production: {
                files: {
                    // 'dist/main.min.js': ['dist/main.js']
                }
            },
            libs: {
                files: {
                    // 'dist/libs.min.js': ['dist/libs.js']
                }
            }
        },
        concat: {
            js: {
                dest: 'dist/main.js',
                src: [
                    'src/app.js',
                    'src/views.js',
                    'src/directives/**/*.js',
                    'src/models/**/*.js',
                    'src/services/**/*.js',
                    'src/filters/*.js',
                ]
            },
            libs: {
                dest: 'dist/libs.js',
                src: [
                    'node_modules/jquery/dist/jquery.js',
                    'node_modules/angular/angular.js',
                    'node_modules/bootstrap/dist/js/bootstrap.js',
                    'node_modules/angular-route/angular-route.js',
                    'node_modules/angularjs-slider/dist/rzslider.js',
                ]
            }
        },
        ngtemplates: {
            options: {
                module: 'turnon',
                htmlmin: {
                    collapseBooleanAttributes: false,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: false,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            dist: {
                cwd: 'src/',
                src: path.join('**/*.html'),
                dest: path.join('src/views.js')
            }
        },
        sprite:{
            layout: {
                src: 'src/sprites/layout/*.png',
                retinaSrcFilter: 'src/sprites/layout/*@2x.png',
                dest: 'src/sprites/compiled/images/layout-sprite.png',
                retinaDest: 'src/sprites/compiled/images/layout-sprite@2x.png',
                destCss: 'src/sprites/compiled/layout-sprite.css'
            },
            category: {
                src: 'src/sprites/category/*.png',
                retinaSrcFilter: 'src/sprites/category/*@2x.png',
                dest: 'src/sprites/compiled/images/category-sprite.png',
                retinaDest: 'src/sprites/compiled/images/category-sprite@2x.png',
                destCss: 'src/sprites/compiled/category-sprite.css'
            }
        },
        less: {
            production: {
                files: {
                    'dist/main.css': 'src/app.less'
                }
            }
        },
        imagemin: {
            production: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: 'src/',
                    src: [
                        'sprites/compiled/images/*.png',
                        'images/*'
                    ],
                    dest: 'dist/images/'
                }]
            },
            development: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: 'src/',
                    src: [
                        'sprites/compiled/images/*.png',
                        'images/*'
                    ],
                    dest: 'dist/images/'
                }]
            }
        },
        clean: {
            build: {
                src: ['dist/font', 'dist/images', 'dist/main*.css', 'dist/main*.js']
            }
        },
        cssmin: {
            production: {
        //         files: {
        //             'dist/main.min.css': [
        //                 'dist/main.css'
        //             ]
        //         }
            }
        },
        watch: {
            all: {
                files: [
                    'src/**/*.html',
                    'src/**/*.js',
                    'src/models/*.js',
                    'src/services/**/*.js',
                    'src/utils/*.js',
                    'src/filters/*.js',
                    'src/interceptors/*.js',
                    'src/**/*.less',
                    '!src/views.js'
                ],
                tasks: ['default'],
                options: {
                    spawn: false,
                    interrupt: true
                }
            }
        },
        copy: {
            production: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/fonts/*'],
                        dest: 'dist/font/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/videos/*'],
                        dest: 'dist/videos/'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('script', ['ngtemplates', 'concat:js'/*, 'uglify:production'*/]);
    grunt.registerTask('libs', ['concat:libs', 'uglify:libs']);

    grunt.registerTask('media:development', ['sprite', 'imagemin:development']);
    grunt.registerTask('media:production', ['sprite', 'imagemin:production']);

    grunt.registerTask('style:development', [/*'media:development',*/ 'less'/*, 'cssmin'*/]);
    grunt.registerTask('style:production', ['media:production', 'less'/*, 'cssmin' */]);

    grunt.registerTask('default', [/*'clean', */'script', 'style:development', 'copy', 'watch:all']);
    grunt.registerTask('production', ['clean', 'script', 'style:production', 'copy']);
};
