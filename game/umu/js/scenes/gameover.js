game.GameOverScene = me.ScreenObject.extend({
    init: function() {
    },

    onResetEvent: function() {

        this.background = new me.ColorLayer("background", "#FFFFFF", 90);
        //this.background.alpha = 0.75;
        me.game.world.addChild(this.background, 0);

        this.dialog = new UILable(
            game.data.screenWidth / 2,
            game.data.screenHeight / 2 - 256,
            {
                align: "center",
                text: "TIME'S UP\n\nSCORE: " + game.data.score
            }
        )

        me.game.world.addChild(this.dialog, 101);

        this.retry = new Retry();
        me.game.world.addChild(this.retry, 100);

    },

    onDestroyEvent: function() {
        me.game.world.addChild(this.dialog);
        me.game.world.addChild(this.retry);
        this.dialog = null;
        this.retry = null;
    }
});
