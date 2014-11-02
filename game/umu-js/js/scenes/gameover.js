game.GameOverScene = me.ScreenObject.extend({
    init: function() {
    },

    onResetEvent: function() {

        this.background = new me.ColorLayer("background", "#FFFFFF", 90);
        me.game.world.addChild(this.background, 0);

        this.dialog = new (me.Renderable.extend({
            // constructor
            init: function() {
                this.font = new me.BitmapFont("32x32_font", 64);
            },

            draw: function (context) {
                //top score
                this.font.draw(
                    context,
                    "TIME'S UP",
                    game.data.screenWidth / 2 - 256,
                    game.data.screenHeight / 2 - 256
                );

            }
        }));

        me.game.world.addChild(this.dialog, 100);

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
