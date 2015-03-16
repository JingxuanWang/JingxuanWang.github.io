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

		/*
        this.title = new UILabel(
            game.data.screenWidth / 2,
            30,
            {
                font: "Microsoft Yahei",
                textAlign: "center",
                size: 36,
                text: game.data.title
            }
        );

        this.addChild(this.title);
		*/
        this.addChild(new background(), 10);

        var adjustPixel = 3;

        this.scoreIcon = new me.Sprite(
            90 + 2,
            21 + adjustPixel,
            me.loader.getImage("star"),
            24,
            26
        );
        this.addChild(this.scoreIcon, 11);

        this.score = new UILabel(
            130,
            20 + adjustPixel,
            {
                font: "Microsoft Yahei",
                fillStyle: "#4d696d",
                size: 28,
                text: "得分"
            }
        );
        this.addChild(this.score, 11);

        this.timeIcon = new me.Sprite(
            269,
            20 + adjustPixel,
            me.loader.getImage("time"),
            27,
            28
        );
        this.addChild(this.timeIcon, 11);

        this.time = new UILabel(
            310,
            20 + adjustPixel,
            {
                font: "Microsoft Yahei",
                fillStyle: "#4d696d",
                size: 28,
                text: "计时"
            }
        );
        this.addChild(this.time, 11);

        this.comboIcon = new me.Sprite(
            460 - 3,
            23 + adjustPixel,
            me.loader.getImage("ok"),
            29,
            21
        );
        this.addChild(this.comboIcon, 11);

        this.combo = new UILabel(
            500,
            20 + adjustPixel,
            {
                font: "Microsoft Yahei",
                fillStyle: "#4d696d",
                size: 28,
                text: "连中"
            }
        );
        this.addChild(this.combo, 11);

        this.addChild(new game.hud.Score(130, 72), 11);
        this.addChild(new game.hud.Time(345, 72), 11);
        this.addChild(new game.hud.Combo(510, 72), 11);
    }
});

var background = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y, settings) {

        this.settings = settings || {};

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);

    },

    /**
     * draw the score
     */
    draw : function (renderer) {
        var context = renderer.getContext();
        context.fillStyle = "#D7D7D9";
        context.fillRect(0, 0, game.data.screenWidth, 2);
        context.fillStyle = "#F2F2F2";
        context.fillRect(0, 0, game.data.screenWidth, 160);
        context.fillStyle = "#FFB204";
        context.fillRect(0, 160, game.data.screenWidth, 2);
    }
});

/**
 * a basic hud item to display score
 */

game.hud.Score = UILabel.extend({
    init : function(x, y) {
        this._super(UILabel, 'init', [x, y,
            {
                font: "Microsoft Yahei",
                textAlign: "center",
                size: 72,
                fillStyle: "#435060",
                text: game.data.score
            }
        ]);
    },
    /**
     * update function
     */
    update : function (dt) {
        // we don't draw anything fancy here, so just
        // return true if the score has been updated
        this.text = game.data.score;
        return false;
    }
});

game.hud.Time = UILabel.extend({
    init : function(x, y) {
        this._super(UILabel, 'init', [x, y,
            {
                font: "Microsoft Yahei",
                textAlign: "center",
                size: 72,
                fillStyle: "#435060",
                text: game.data.totalTime
            }
        ]);
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
        this.text = game.data.curTime + "″";

        return true;
    }
});

/**
 * a basic hud item to display combo
 */

game.hud.Combo = UILabel.extend({
    init : function(x, y) {
        this._super(UILabel, 'init', [x, y,
            {
                font: "Microsoft Yahei",
                textAlign: "center",
                size: 72,
                fillStyle: "#435060",
                text: game.data.combo
            }
        ]);
    },
    /**
     * update function
     */
    update : function (dt) {
        
		if (game.data.combo > 0) {
			this.text = game.data.combo;
		} else {
			this.text = 0;
		}
        return false;
    }
});


