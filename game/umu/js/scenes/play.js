game.PlayScene = me.ScreenObject.extend({
    onResetEvent: function() {
        // add background
        this.background = new me.ColorLayer("background", "#FFFFFF", 0);
        me.game.world.addChild(this.background, 0);

        // reset the score
        game.data.score = 0;
        game.data.level = 1;
        game.data.curTime = game.data.totalTime;
        game.data.startTime = me.timer.getTime();

        // add our hud to the game world
        this.hud = new game.hud.Container();
        me.game.world.addChild(this.hud);

        this.round = new Round();
        me.game.world.addChild(this.round, 10);
        this.round.open();
    },

    onDestroyEvent: function() {
        // remove the hud from the game world
        me.game.world.removeChild(this.hud);
        me.game.world.removeChild(this.round);

        this.hud = null;
        this.round = null;
    }
});
