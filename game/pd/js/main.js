var game = {
    data: {
        
		score : 0,
        hitScore : 10,
		maxScore : 3000,
		totalRank : 10000,
        
		level : 1,
        round : 1,
        correct_count : 0,
		combo : 0,
        totalTime: 45,
        curTime: 0,
        startTime: 0,
        roundStartTime: 0,

        screenWidth: 640,
        screenHeight: 960,

        spriteSize: 192,
        margin: 0
    },

    "onload": function() {
		// Initialize the video.
        if (!me.video.init("screen", me.video.CANVAS, game.data.screenWidth, game.data.screenHeight, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

		// disable double tap in WeiXin
		if (isWeixinBrowser()) {
			var elm = document.getElementById("screen").firstChild;
			var catcher = function(evt) {
				if (evt.touches.length < 2) {
					evt.preventDefault();
				}
			};

			elm.addEventListener('touchstart', catcher, true);
		}

        me.state.set(me.state.LOADING, new game.LoadingScene());
        me.state.set(me.state.PLAY, new game.PlayScene());
        me.state.set(me.state.GAMEOVER, new game.GameOverScene());

        me.loader.load(
            {name: "logo", type:"image", src: "data/img/Logo.png"},
            this.onLogoLoaded.bind(this)
        );
    },

    "onLogoLoaded" : function() {
        // Load the resources.
        me.loader.preload(game.resources);
        me.loader.onload = this.loaded;

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

    "loaded": function() {
        // Start the game.
        me.state.change(me.state.PLAY);
    }
};
