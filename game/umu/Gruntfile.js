/*global module:false*/
module.exports = function(grunt) {

	var source = {
		speedSort: [
	        'js/main.js',
	        'js/resources.js',
	        'js/util.js',
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
	        'js/util.js',
	        'js/ui/uiButton.js',
	        'js/ui/uiLabel.js',
	        'js/objects/retry.js',
	        'js/objects/mark.js',
	        'js/objects/hud.js',
	        'js/objects/selectable-object.js',
	        'js/game-logic/number-order.js',
	        'js/scenes/loading.js',
	        'js/scenes/play.js',
	        'js/scenes/gameover.js'
		],

		matchingPair: [
	        'js/main.js',
	        'js/resources.js',
	        'js/util.js',
	        'js/ui/uiButton.js',
	        'js/ui/uiLabel.js',
	        'js/objects/retry.js',
	        'js/objects/mark.js',
	        'js/objects/hud.js',
	        'js/objects/selectable-object.js',
	        'js/game-logic/matching-pair.js',
	        'js/scenes/loading.js',
	        'js/scenes/play.js',
	        'js/scenes/gameover.js'
		],

		realtimeStatus: [
	        'js/util.js',
	        'js/ui/uiLabel.js',
	        'js/objects/avatar.js',
		    'js/realtime-status.js',
	        'js/scenes/loading.js',
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
			},
			matchingPair: {
                src: source.matchingPair,
                dest: 'build/game-matching-pair.js'
			},
			realtimeStatus: {
				src: source.realtimeStatus,
                dest: 'build/realtime-status.js'
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
            },
           	matchingPair: {
                files: {
                    'build/game-matching-pair-min.js': [
                        source.matchingPair
                    ]
                }
            },
        	realtimeStatus: {
                files: {
                    'build/realtime-status-min.js': [
                        source.realtimeStatus
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
				'build/realtime-status*.js'
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
