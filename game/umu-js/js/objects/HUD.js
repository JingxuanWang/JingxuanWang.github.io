game.HUD = game.HUD || {};

game.HUD.Container = me.Container.extend({

    init: function() {
        // call the constructor
        this._super(me.Container, 'init');

        // persistent across level change
        this.isPersistent = true;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";

        // add our child score object at the right-bottom position
        this.addChild(new game.HUD.ScoreItem(0, 0));
        this.addChild(new game.HUD.TimeItem(0, 50));
    }
});

/**
 * a basic HUD item to display score
 */

game.HUD.ScoreItem = me.Renderable.extend({

    /**
     * constructor
     */
    init: function(x, y) {

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);

        // create a font
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("left");

        // local copy of the global score
        this.score = -1;

        // make sure we use screen coordinates
        this.floating = true;
    },

    /**
     * update function
     */
    update : function (dt) {
        // we don't draw anything fancy here, so just
        // return true if the score has been updated
        if (this.score !== game.data.score) {
            this.score = game.data.score;
            return true;
        }
        return false;
    },

    /**
     * draw the score
     */
    draw : function (context) {
        this.font.draw (
            context,
            "SCORE: " + game.data.score,
            this.pos.x,
            this.pos.y
        );
    }
});

game.HUD.TimeItem = me.Renderable.extend({

    /**
     * constructor
     */
    init: function(x, y) {

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);

        // create a font
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("left");

        // local copy of the global score
        this.time = game.data.totalTime;

        // make sure we use screen coordinates
        this.floating = true;
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

        return true;
    },

    /**
     * draw the score
     */
    draw : function (context) {
        this.font.draw (
            context,
            "TIME: " + game.data.curTime,
            this.pos.x,
            this.pos.y
        );
    }
});