var game = {
    data: {
        score : 0,
        hitScore : 10,
        count_max: 9,
        count_min: 5,
        count : 5,
        start: false,
        hiScore: false,
        muted: false,
        totalTime: 10,
        curTime: 0,
        startTime: 0,

        fruits: [
            "banana",
            "cherry",
            "grape",
            "pear",
            "pineapple",
            "watermelon"
        ],

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

        // Load the resources.
        me.loader.preload(game.resources);
        me.loader.onload = this.loaded;

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

    "loaded": function() {
        me.state.set(me.state.PLAY, new game.PlayScene());
        me.state.set(me.state.GAMEOVER, new game.GameOverScene());

        // Start the game.
        me.state.change(me.state.PLAY);
    }
};
