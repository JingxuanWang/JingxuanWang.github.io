/*global module:false*/
module.exports = function(grunt) {

	var source = {
		speedSort: [
	        'js/main.js',
	        'js/resources.js',
	        'js/ui/uiButton.js',
	        'js/ui/uiLabel.js',
	        'js/objects/fruit.js',
	        'js/objects/arrow.js',
	        'js/objects/mark.js',
	        'js/objects/retry.js',
	        'js/objects/hud.js',
	        'js/game-logic/speed-sort.js',
	        'js/scenes/loading.js',
	        'js/scenes/play.js',
	        'js/scenes/gameover.js'
		],

		numberOrder: [
	        'js/main.js',
	        'js/resources.js',
	        'js/ui/uiButton.js',
	        'js/ui/uiLabel.js',
	        'js/objects/fruit.js',
	        'js/objects/arrow.js',
	        'js/objects/mark.js',
	        'js/objects/retry.js',
	        'js/objects/hud.js',
	        'js/objects/selectable-object.js',
	        'js/game-logic/number-order.js',
	        'js/scenes/loading.js',
	        'js/scenes/play.js',
	        'js/scenes/gameover.js'
		]
	};

    // Project configuration.
    grunt.initConfig({
        concat: {
			speedSort: {
                src: source.speedSort,
                dest: 'build/game-speed-sort.js'
			},
			numberOrder: {
                src: source.numberOrder,
                dest: 'build/game-number-order.js'
			}
        },

        uglify: {
            options: {
                report: 'min',
                preserveComments: 'some'
            },
            speedSort: {
                files: {
                    'build/game-speed-sort-min.js': [
                        source.speedSort
                    ]
                }
            },
            numberOrder: {
                files: {
                    'build/game-number-order-min.js': [
                        source.numberOrder
                    ]
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
                'build/game*.js',
            ],
        },

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-contrib-connect");


    // Default task.
    grunt.registerTask('default', ['concat', 'uglify', 'connect']);
};
