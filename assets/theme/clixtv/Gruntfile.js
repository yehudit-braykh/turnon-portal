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
                    'src/models/*.js',
                    'src/services/**/*.js',
                    'src/utils/*.js',
                    'src/filters/*.js',
                    'src/interceptors/*.js'
                ]
            },
            libs: {
                dest: 'dist/libs.js',
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/slick-carousel/slick/slick.js',
                    'bower_components/angular-slick-carousel/dist/angular-slick.min.js',
                    'node_modules/angular-ui-router/release/angular-ui-router.js',
                    'bower_components/angular-scroll/angular-scroll.js',
                    'bower_components/ng-parallax/angular-parallax.js',
                    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
                    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
                    'bower_components/angular-elastic-input/dist/angular-elastic-input.js',
                    'node_modules/angular-ui-switch/angular-ui-switch.js',
                    'node_modules/moment/min/moment.min.js',
                    'bower_components/ngFitText/dist/ng-FitText.min.js',
                    'bower_components/angular-modal-service/dst/angular-modal-service.min.js',
                    'node_modules/angular-local-storage/dist/angular-local-storage.js',
                    'bower_components/ngMask/dist/ngMask.min.js',
                    'node_modules/angular-filter/dist/angular-filter.min.js',
                    'node_modules/angular-touch/angular-touch.js',
                    'node_modules/angular-cache/dist/angular-cache.js',
                    'node_modules/angular-lz-string/angular-lz-string.js',
                    'node_modules/angular-sanitize/angular-sanitize.js',
                    'node_modules/angular-inview/angular-inview.js'
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
            },
            category: {
                src: 'src/ui/sprites/category/*.png',
                retinaSrcFilter: 'src/ui/sprites/category/*@2x.png',
                dest: 'src/ui/sprites/compiled/images/category-sprite.png',
                retinaDest: 'src/ui/sprites/compiled/images/category-sprite@2x.png',
                destCss: 'src/ui/sprites/compiled/category-sprite.css'
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
            },
            development: {
                options: {
                    optimizationLevel: 3
                },
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
            all: {
                files: [
                    'src/ui/**/*.html',
                    'src/ui/**/*.js',
                    'src/models/*.js',
                    'src/services/**/*.js',
                    'src/utils/*.js',
                    'src/filters/*.js',
                    'src/interceptors/*.js',
                    'src/ui/**/*.less',
                    '!src/ui/views.js'
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
                        src: ['src/ui/fonts/*'],
                        dest: 'dist/font/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/ui/videos/*'],
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

    grunt.registerTask('script', ['ngtemplates', 'concat:js', 'uglify:production']);
    grunt.registerTask('libs', ['concat:libs', 'uglify:libs']);

    grunt.registerTask('media:development', ['sprite', 'imagemin:development']);
    grunt.registerTask('media:production', ['sprite', 'imagemin:production']);

    grunt.registerTask('style:development', [/*'media:development',*/ 'less', 'cssmin']);
    grunt.registerTask('style:production', ['media:production', 'less', 'cssmin']);

    grunt.registerTask('default', [/*'clean', */'script', 'style:development', 'copy', 'watch:all']);
    grunt.registerTask('production', ['clean', 'script', 'style:production', 'copy']);
};