var game = {
    data: {
        score : 0,
        hitScore : 10,
        level : 1,
        totalTime: 60,
        curTime: 0,
        startTime: 0,

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
