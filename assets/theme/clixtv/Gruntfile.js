var path = require('path');

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            production: {
                files: {
                    'dist/main.min.js': ['dist/main.js']
                }
            },
            libs: {
                files: {
                    'dist/libs.min.js': ['dist/libs.js']
                }
            }
        },
        concat: {
            js: {
                dest: 'dist/main.js',
                src: [
                    'src/ui/app.js',
                    'src/ui/views.js',
                    'src/ui/**/*.js',
                    'src/services/*.js'
                ]
            },
            libs: {
                dest: 'dist/libs.js',
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/slick-carousel/slick/slick.js',
                    'bower_components/angular-slick-carousel/dist/angular-slick.min.js'
                ]
            }
        },
        ngtemplates: {
            options: {
                module: 'clixtv',
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
                dest: path.join('src/ui/views.js')
            }
        },
        sprite:{
            layout: {
                src: 'src/ui/sprites/layout/*.png',
                retinaSrcFilter: 'src/ui/sprites/layout/*@2x.png',
                dest: 'src/ui/sprites/compiled/images/layout-sprite.png',
                retinaDest: 'src/ui/sprites/compiled/images/layout-sprite@2x.png',
                destCss: 'src/ui/sprites/compiled/layout-sprite.css'
            }
        },
        less: {
            production: {
                files: {
                    'dist/main.css': 'src/ui/app.less'
                }
            }
        },
        imagemin: {
            production: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: 'src/ui/',
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
                files: {
                    'dist/main.min.css': [
                        'dist/main.css'
                    ]
                }
            }
        },
        watch: {
            scripts: {
                files: [
                    'src/ui/**/*.html',
                    'src/ui/**/*.js',
                    'src/services/*.js',
                    'src/ui/**/*.less'
                ],
                tasks: ['default'],
                options: {
                    spawn: false
                }
            }
        },
        copy: {
            production: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/ui/fonts/*'],
                        dest: 'dist/font/'
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

    grunt.registerTask('script', ['ngtemplates', 'concat:js', 'uglify:production']);
    grunt.registerTask('libs', ['concat:libs', 'uglify:libs']);
    grunt.registerTask('media', ['sprite', 'imagemin']);
    grunt.registerTask('style', ['media', 'less', 'cssmin']);
    grunt.registerTask('default', ['clean', 'script', 'style', 'copy', 'watch']);
};