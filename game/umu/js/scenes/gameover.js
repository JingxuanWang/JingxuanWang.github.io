game.GameOverScene = me.ScreenObject.extend({
    init: function() {
    },

    onResetEvent: function() {

        this.background = new me.ColorLayer("background", "#FFFFFF", 90);
        //this.background.alpha = 0.75;
        me.game.world.addChild(this.background, 0);

        ajax(
            "GET",
            game.data.apiUrl + "?m=post&game_id=" + game.data.gameId
            + "&user_id=" + game.data.playerId
            + "&score=" + game.data.score
        );

        this.dialog = new UILabel(
            game.data.screenWidth / 2,
            game.data.screenHeight / 2 - 256,
            {
                bitmapFont: true,
                textAlign: "center",
                text: "TIME'S UP\n\nID: " + game.data.playerId + "\n\nSCORE: " + game.data.score
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
