// Generated on 2014-02-06 using generator-webapp 0.4.7
/* global module */

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    /* global require */
    'use strict';

    var _ = require('lodash');

    var common = {
        jshint: {
            options: {
                browser: true,
                esnext: true,
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                quotmark: 'single',
                undef: true,
                unused: 'vars',
                strict: true,
                trailing: true,
                smarttabs: true,
                jquery: true,
            },
        },
        csslint: {
            options: {
                // possible errors
                'box-model': false,
                'display-property-grouping': true,
                'duplicate-properties': true,
                'empty-rules': true,
                'known-properties': true,
                'non-link-hover': true,

                // compatibility
                'adjoining-classes': false,
                'box-sizing': true,
                'compatible-vendor-prefixes': true,
                'gradients': true,
                'text-indent': true,
                'vendor-prefix': true,
                'fallback-colors': true,
                'star-property-hack': true,
                'underscore-property-hack': true,
                'bulletproof-font-face': true,

                // performance
                'font-faces': true,
                'import': true,
                'regex-selectors': true,
                'universal-selector': true,
                'unqualified-attributes': true,
                'zero-units': true,
                'overqualified-elements': true,
                'shorthand': true,
                'floats': true,
                'font-sizes': true,
                'ids': true,
                'important': true,

                // accessibility
                'outline-none': true,

                // oocss
                'qualified-headings': false,
                'unique-headings': false,
            },
        },
    };

    var jasmineRequirejsTemplateOptions = function(withInstanbul) {
        /* global requirejs */
        var callback;
        if (withInstanbul) {
            callback = function() {
                var oldLoad = requirejs.load;
                requirejs.load = function (context, moduleName, url) {
                    //console.log('context=' + JSON.stringify(arguments), 'moduleName=' + moduleName, 'url=' + url);
                    var parts = url.split('/');
                    for (var i = 0; i < parts.length; ) {
                        var part = parts[i];
                        if (part === '.') {
                            parts.splice(i, 1);
                        } else if (part === '') {
                            parts.splice(i, 1);
                        } else if (part === '..') {
                            if (i > 0) {
                                i--;
                                parts.splice(i, 2);
                            } else {
                                parts.splice(i, 1);
                            }
                        } else {
                            i++;
                        }
                    }
                    url = parts.join('/');
                    if (url.indexOf('app/scripts/') === 0) {
                        url = './.grunt/grunt-contrib-jasmine/' + url;
                    }
                    if (url.indexOf('test/specs/') === 0) {
                        url = './.grunt/grunt-contrib-jasmine/' + url;
                    }
                    //console.log('url=' + url);
                    return oldLoad.apply(this, [context, moduleName, url]);
                };
            };
        }
        return {
            requireConfigFile: '<%= yeoman.app %>/scripts/config.js',
            requireConfig: {
                baseUrl: '<%= yeoman.app %>/scripts',
                callback: callback
            }
        };
    };

    var jasmineInstanbulTemplateOptions = function(nestedTemplate, nestedOptions) {
        return {
            coverage: 'bin/coverage/coverage.json',
            report: 'bin/coverage',
            replace: false,
            template: require(nestedTemplate),
            templateOptions: nestedOptions
        };
    };

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        bower: {
            target: {
                options: {
                    exclude: [
                        'modernizr',
                        'requirejs',
                    ]
                },
                rjsConfig: 'app/scripts/config.js'
            }
        },

        // Project settings
        yeoman: {
            // Configurable paths
            app: 'app',
            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['jshint'],
            },
            jstest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['test:watch']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            html: {
                files: ['<%= yeoman.app %>/**/*.html'],
                tasks: ['htmlhint'],
            },
            styles: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['csslint', 'newer:copy:styles', 'autoprefixer']
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            app: {
                options: {
                    open: false,
                    base: [
                        '.tmp',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: false,
                    base: '<%= yeoman.dist %>',
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: _.extend({}, common.jshint.options, {
                reporter: require('jshint-stylish')
            }),
            all: [
                'Gruntfile.js',
                'test/spec/{,*/}*.js'
            ],
            scripts: {
                options: {
                    globals: {
                        define: false,
                    }
                },
                files: {
                    src: [
                        '<%= yeoman.app %>/scripts/*.js',
                        '<%= yeoman.app %>/scripts/!(vendor)**/*.js',
                    ]
                }
            },
            specs: {
                options: {
                    globals: {
                        define: false,
                        describe: false,
                        expect: false,
                        it: false,
                    }
                },
                files: {
                    src: [
                        'test/specs/**/*.spec.js'
                    ]
                }
            }
        },

        csslint: {
            options: _.extend({}, common.csslint.options, {
            }),
            app: {
                src: [
                    '<%= yeoman.app %>/styles/**/!(404)*.css',
                ],
            },
            404: {
                options: _.extend({}, common.csslint.options, {
                    'duplicate-properties': false,
                    'display-property-grouping': false,
                    'star-property-hack': false,
                    'underscore-property-hack': false,
                    'ids': false,
                }),
                src: [
                    '<%= yeoman.app %>/styles/**/404.css',
                ],
            },
        },

        htmlhint: {
            options: {
                'tagname-lowercase': true,
                'attr-lowercase': true,
                'attr-value-double-quotes': true,
                'attr-value-not-empty': true,
                'tag-pair': true,
                'tag-self-close': true,
                'spec-char-escape': true,
                'id-unique': true,
                'src-not-empty': true,
                'id-class-value': true,
                'style-disabled': true,
                'img-alt-require': true,
                csslint: _.extend({}, common.csslint.options, {
                }),
                jshint: _.extend({}, common.jshint.options, {
                }),
            },
            app: {
                options: {
                    'doctype-first': true,
                },
                src: [
                    '<%= yeoman.app %>/!(404)*.html',
                ],
            },
            404: {
                options: {
                    'head-script-disabled': true,
                    'doctype-first': true,
                },
                src: [
                    '<%= yeoman.app %>/404.html',
                ],
            },
            view: {
                options: {
                },
                src: [
                    '<%= yeoman.app %>/scripts/view/*/*.html',
                ],
            },
        },

        jasmine: {
            all: {
                src: [
                    '<%= yeoman.app %>/scripts/{,**/}*.js',
                    'test/specs/**/*.spec.js',
                ],
                options: {
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: jasmineInstanbulTemplateOptions('grunt-template-jasmine-requirejs', jasmineRequirejsTemplateOptions(true))
                }
            }
        },

        // Mocha testing framework configuration options
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
                }
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        'bower-install': {
            app: {
                html: '<%= yeoman.app %>/index.html',
                ignorePath: '<%= yeoman.app %>/'
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/*/**/*.js',
                        '<%= yeoman.dist %>/scripts/!(config)*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/styles/fonts/{,*/}*.*'
                    ]
                }
            },
            img: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/{images,img}/{,*/}*.{gif,jpeg,jpg,png,webp}',
                    ]
                }
            },
            requireconfig: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/config.js'
                    ]
                }
            }
        },

        requirejs: {
            dist: {
                options: {
                    done: function(done) {
                        var requireModules = grunt.config('requireModules') || {};
                        var lines = [
                            'require.bundles = (function(bundles) {',
                        ];
                        for (var key in requireModules) {
                            var keyS = JSON.stringify(key);
                            var value = requireModules[key];
                            var included = [];
                            for (var i = 0; i < value.included.length; i++) {
                                var file = value.included[i];
                                if (file.match(/\.js$/)) {
                                    included.push(file.substring(0, file.length - 3));
                                }
                            }
                            lines.push('bundles[' + keyS + '] = ' + JSON.stringify(included) + ';');
                        }
                        lines.push('return bundles;');
                        lines.push('})(require.bundles || {});');
                        grunt.file.write('.tmp/scripts/bundles.js', lines.join('\n'));
                        done();
                    },
                    baseUrl: '<%= yeoman.app %>/scripts',
                    mainConfigFile: '<%= yeoman.app %>/scripts/config.js',
                    wrapShim: true,
                    keepBuildDir: true,
                    dir: '<%= yeoman.dist %>/scripts',
                    optimize: 'none',
                    removeCombined: true,
                    paths: {
                        'facebook': 'empty:',
                        'nls': 'empty:',
                    },
                    onModuleBundleComplete: function(data) {
                        if (data.name.slice(0, 'modules/'.length) === 'modules/') {
                            var requireModules = grunt.config('requireModules') || {};
                            requireModules[data.name] = data;
                            grunt.config('requireModules', requireModules);
                        }
                    },
                    modules: [
                        {
                            name: 'main',
                            create: true,
                            include: [
                                'app',
                                'text',
                                'i18n',
                                'infinity',
                                'main',
                                'view/footer/index',
                                'view/navbar/index',
                            ],
                        },
                        {
                            name: 'modules/ofbiz',
                            create: true,
                            include: [
                                'ofbiz/model/PostalAddress',
                                'ofbiz/model/TelecomNumber',
                                'ofbiz/model/EmailAddress',
                                'ofbiz/model/Person',
                                'ofbiz/model/PartyGroup',
                            ],
                            exclude: [
                                'main',
                            ],
                        },
                        {
                            name: 'view/cardetail/index',
                            exclude: [
                                'main',
                                'model/Vehicle',
                            ],
                        },
                        {
                            name: 'view/carlisting/index',
                            exclude: [
                                'main',
                                'model/Dealers',
                                'model/Vehicles',
                            ],
                        },
                        {
                            name: 'view/dealers/index',
                            exclude: [
                                'main',
                                'model/Dealers',
                            ],
                        },
                        {
                            name: 'view/home/index',
                            exclude: [
                                'main',
                            ],
                        },
                        {
                            name: 'modules/model-Dealers',
                            create: true,
                            include: [
                                'model/Dealer',
                                'model/Dealers',
                            ],
                            exclude: [
                                'main',
                            ],
                        },
                        {
                            name: 'modules/model-Load',
                            create: true,
                            include: [
                                'model/Loan',
                                'model/Loans',
                            ],
                            exclude: [
                                'main',
                            ],
                        },
                        {
                            name: 'modules/model-Vehicle',
                            create: true,
                            include: [
                                'model/Vehicle',
                                'model/VehicleMake',
                                'model/VehicleMakes',
                                'model/Vehicles',
                            ],
                            exclude: [
                                'main',
                            ],
                        },
                    ],
                }
            },
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= yeoman.dist %>'
            },
            html: '<%= yeoman.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            },
            views: {
                options: {
                    type: 'html',
                },
                src: ['<%= yeoman.dist %>/scripts/{,**/}/*.html'],
            },
            html: ['<%= yeoman.dist %>/!(scripts){,**/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.{gif,jpeg,jpg,png}',
                        dest: '<%= yeoman.dist %>/images'
                    },
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/img',
                        src: '{,*/}*.{gif,jpeg,jpg,png}',
                        dest: '<%= yeoman.dist %>/img'
                    },
                ]
            }
        },
        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= yeoman.dist %>/images'
                    },
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/img',
                        src: '{,*/}*.svg',
                        dest: '<%= yeoman.dist %>/img'
                    },
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //     dist: {
        //         files: {
        //             '<%= yeoman.dist %>/styles/main.css': [
        //                 '.tmp/styles/{,*/}*.css',
        //                 '<%= yeoman.app %>/styles/{,*/}*.css'
        //             ]
        //         }
        //     }
        // },
        // uglify: {
        //     dist: {
        //         files: {
        //             '<%= yeoman.dist %>/scripts/scripts.js': [
        //                 '<%= yeoman.dist %>/scripts/scripts.js'
        //             ]
        //         }
        //     }
        // },
        // concat: {
        //     dist: {}
        // },

        concat: {
            requireconfig: {
            }
        },

        uglify: {
            dist: {
            },
            requireconfig: {
                files: {
                    '<%= yeoman.dist %>/scripts/config.js': [
                        '<%= yeoman.dist %>/scripts/config.js',
                        '.tmp/scripts/config.js',
                    ],
                }
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            img: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '{images,img}/{,**/}*.*',
                        'scripts/view/**/*.html',
                    ]
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '{,*/}*.html',
                        'styles/fonts/{,*/}*.*'
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },


        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            devFile: '<%= yeoman.app %>/bower_components/modernizr/modernizr.js',
            outputFile: '<%= yeoman.dist %>/bower_components/modernizr/modernizr.js',
            files: [
                '<%= yeoman.dist %>/scripts/{,*/}*.js',
                '<%= yeoman.dist %>/styles/{,*/}*.css',
                '!<%= yeoman.dist %>/scripts/vendor/*'
            ],
            uglify: true
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-bower-requirejs');

    grunt.registerTask('revconfig', function () {
        var prefix = grunt.template.process('<%= yeoman.dist %>/scripts/');
        var pattern = prefix + '**/*.{js,html}';
        var files = grunt.file.expand(pattern);
        var lines = [];
        grunt.util._.each(files, function(file) {
            file = file.substring(prefix.length);
            var res = file.match(/^(.*\/)?([0-9a-f]+)\.([^\/]+)\.([^\.]+)$/);
            if (!res) {
                return;
            }
            //grunt.log.oklns(JSON.stringify(res));
            var dir = res[1] || '';
            //var hash = res[2];
            var base = res[3];
            var ext = res[4];
            var id;
            if (ext === 'js') {
                id = dir + base;
                file = file.substring(0, file.length - ext.length - 1);
            } else if (ext === 'html') {
                id = 'text!' + dir + base + '.' + ext;
            }
            grunt.log.oklns('map: ' + id + ' -> ' + file);
            lines.push('require.paths[' + JSON.stringify(id) + ']=' + JSON.stringify(file) + ';\n');
        });
        grunt.file.write('.tmp/scripts/config.js', lines.join(''));
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:app',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', function(target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'concurrent:test',
                'autoprefixer',
            ]);
        }

        grunt.task.run([
            'connect:test',
            'mocha'
        ]);
    });

    grunt.registerTask('build', [
        'jshint',
        'htmlhint',
        'csslint',
        'clean:dist',
        'useminPrepare',
        'copy:img',
        'rev:img',
        'usemin:views',
        'requirejs',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify:dist',
        'copy:dist',
        'modernizr',
        'rev:dist',
        'revconfig',
        'uglify:requireconfig',
        'rev:requireconfig',
        'usemin:html',
        'usemin:css',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'bower',
        'newer:jshint',
//        'test',
        'build'
    ]);
};
