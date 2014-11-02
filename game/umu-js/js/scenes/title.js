game.TitleScene = me.ScreenObject.extend({
    init: function(){

    },

    onResetEvent: function() {
        // add background
        this.background = new me.ColorLayer("background", "#FFFFFF", 0);
        me.game.world.addChild(this.background, 0);

        // reset the score
        game.data.score = 0;
        game.data.curTime = game.data.totalTime;
        game.data.count = game.data.count_min;
        game.data.startTime = me.timer.getTime();

        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);


        this.round = new Round();
        me.game.world.addChild(this.round, 100);
        this.round.open();
    },

    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
        me.game.world.removeChild(this.round);

        this.HUD = null;
        this.round = null;
    }
});
