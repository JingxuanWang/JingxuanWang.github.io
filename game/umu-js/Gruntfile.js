/*global module:false*/
module.exports = function(grunt) {
    var sourceFiles = [
        'js/main.js',
        'js/resources.js',
        'js/objects/fruit.js',
        'js/objects/arrow.js',
        'js/objects/mark.js',
        'js/objects/retry.js',
        'js/objects/round.js',
        'js/objects/HUD.js',
        'js/scenes/title.js',
        //'js/scenes/play.js',
        'js/scenes/gameover.js'
    ];

    // Project configuration.
    grunt.initConfig({
        concat: {
            dist: {
                src: sourceFiles,
                dest: 'build/game.js'
            }
        },

        uglify: {
            options: {
                report: 'min',
                preserveComments: 'some'
            },
            dist: {
                files: {
                    'build/game-min.js': [
                        sourceFiles
                    ]
                }
            }
        },

        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },

            beforeConcat: {
                files: {
                    src: sourceFiles
                }
            },

            afterConcat: {
                files: {
                    src: [ sourceFiles ]
                }
            }
        },

        connect : {
            root : {
                options : {
                    port : 8001,
                    keepalive : true,
                    host: '*'
                }
            }
        },

        clean: {
            dist: [
                'build/game.js',
                'build/game-min.js'
            ],
        },

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-contrib-connect");


    // Default task.
    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('lint', ['jshint:beforeConcat', 'concat', 'jshint:afterConcat']);
};
