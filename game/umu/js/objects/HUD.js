game.hud = game.hud || {};

game.hud.Container = me.Container.extend({

    init: function() {
        // call the constructor
        this._super(me.Container, 'init');

        // persistent across level change
        this.isPersistent = true;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "hud";

        // add our child score object at the right-bottom position
        this.addChild(new game.hud.Score(0, 0));
        this.addChild(new game.hud.Time(0, 50));
        this.addChild(new game.hud.Combo(0, 100));
    }
});

/**
 * a basic hud item to display score
 */

game.hud.Score = UILabel.extend({
    init : function(x, y) {
        this._super(UILabel, 'init', [x, y, {bitmapFont : true}]);
    },
    /**
     * update function
     */
    update : function (dt) {
        // we don't draw anything fancy here, so just
        // return true if the score has been updated
        this.text = "SCORE: " + game.data.score;
        return false;
    }
});

game.hud.Time = UILabel.extend({
    init : function(x, y) {
        this._super(UILabel, 'init', [x, y, {bitmapFont : true}]);
    },
    /**
     * update function
     */
    update : function (dt) {
        // we don't draw anything fancy here, so just
        // return true if the score has been updated
        var elapseTime = me.timer.getTime() - game.data.startTime;
        if (game.data.curTime > 0)
        {
            game.data.curTime = game.data.totalTime - ~~(elapseTime / 1000);
        }
        if (game.data.curTime < 0)
        {
            game.data.curTime = 0;
        }
        if (game.data.curTime == 0)
        {
            console.log("GameOver");
            me.state.change(me.state.GAMEOVER);
        }
        this.text = "TIME: " + game.data.curTime;

        return true;
    }
});

/**
 * a basic hud item to display combo
 */

game.hud.Combo = UILabel.extend({
    init : function(x, y) {
        this._super(UILabel, 'init', [x, y, {bitmapFont : true}]);
    },
    /**
     * update function
     */
    update : function (dt) {
        
		if (game.data.combo > 0) {
			this.text = game.data.combo + " COMBO";
		} else {
			this.text = "";
		}
        return false;
    }
});


