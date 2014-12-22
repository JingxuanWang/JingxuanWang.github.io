/**
 * Created by wang.jingxuan on 14-11-8.
 */

game.data.gameId = 1001;

var imgSize = 183;

var Round = me.Container.extend({

    init: function() {

        this.prefix = "icon-";

        this.countArray = [4, 4, 6, 6, 9];
        this.elemPositions = {
            4: [
                [game.data.screenWidth / 3,     game.data.screenHeight / 3],
                [game.data.screenWidth * 2 / 3, game.data.screenHeight / 3],
                [game.data.screenWidth / 3,     game.data.screenHeight * 2 / 3],
                [game.data.screenWidth * 2 / 3, game.data.screenHeight * 2 / 3]
            ],
            6: [
                [game.data.screenWidth / 3,     game.data.screenHeight / 4],
                [game.data.screenWidth * 2 / 3, game.data.screenHeight / 4],
                [game.data.screenWidth / 3,     game.data.screenHeight / 2],
                [game.data.screenWidth * 2 / 3, game.data.screenHeight / 2],
                [game.data.screenWidth / 3,     game.data.screenHeight * 3 / 4],
                [game.data.screenWidth * 2 / 3, game.data.screenHeight * 3 / 4]
            ],
            9: [
                [game.data.screenWidth / 6,     game.data.screenHeight / 4],
                [game.data.screenWidth / 2,     game.data.screenHeight / 4],
                [game.data.screenWidth * 5 / 6, game.data.screenHeight / 4],
                [game.data.screenWidth / 6,     game.data.screenHeight / 2],
                [game.data.screenWidth / 2,     game.data.screenHeight / 2],
                [game.data.screenWidth * 5 / 6, game.data.screenHeight / 2],
                [game.data.screenWidth / 6,     game.data.screenHeight * 3 / 4],
                [game.data.screenWidth / 2,     game.data.screenHeight * 3 / 4],
                [game.data.screenWidth * 5 / 6, game.data.screenHeight * 3 / 4]
            ]
        };

        this._super(me.Container, 'init', [0, 0, game.data.screenWidth, game.data.screenHeight]);

        this._init();
        /*
         this.label = new UILabel(200, 200, {
         font : "arial", size : 64, text: "Hello World"
         });
         this.addChild(this.label);

         this.bitmapLabel = new UILabel(100, 100, {
         bitmapFont: true
         });
         this.addChild(this.bitmapLabel);
         */
    },

    _init: function() {
        this.ready = true;
        if (game.data.level < this.countArray.length) {
            this.count = this.countArray[game.data.level - 1];
        } else {
            this.count = this.countArray[this.countArray.length - 1];
        }
        this.objList = [];
        this.selectedObjs = [];

        var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        if (game.data.level > 5) {
            array = [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                11, 12, 13, 14, 15, 16, 17, 18, 19, 20
            ];
        }

        var objsToSpawn = [];
        array = shuffle(array);

        for(var i = 0; i < this.count - 1; i++) {
            objsToSpawn.push(array.shift());
        }
        // add head element
        objsToSpawn.push(objsToSpawn[0]);
        objsToSpawn = shuffle(objsToSpawn);

        for(var i = 0; i < objsToSpawn.length; i++) {
            // create selectable number
            var elem = new SelectableObject(
                this.elemPositions[this.count][i][0] - imgSize / 2,
                this.elemPositions[this.count][i][1] - imgSize / 2,
                this.prefix + objsToSpawn[i],
                "frame",
                this.onSelect.bind(this),
                this.onDeselect.bind(this),
                imgSize
            );

            // insert into this.objList
            this.objList.push(elem);
            this.addChild(elem, 10);
        }
    },

    onSelect: function(spriteName) {
        if (this.selectedObjs.length == 0) {
            this._onCorrect(spriteName);
        } else if (spriteName == this.selectedObjs[this.selectedObjs.length - 1]) {
            this._onClear();
        } else {
            this._onMiss();
        }

		game.data.score += game.data.hitScore;

        return true;
    },

    onDeselect: function(spriteName) {
        this.selectedObjs.pop();
        return true;
    },

    _onCorrect : function(spriteName)
    {
        this.selectedObjs.push(spriteName);
    },

    _onMiss : function()
    {
		if (!this.ready) {
			return;
		}
		this.ready = false;
		this.disableObjects();
       
		game.data.combo = 0;
		game.data.level--;
		if (game.data.level < 1) {
			game.data.level = 1;
		}

		var markSprite = new Mark(
            "miss",
            game.data.screenWidth / 2 - imgSize / 2,
            game.data.screenHeight / 2 - imgSize / 2
        );

        this.addChild(markSprite, 30);

        var self = this;
        this.finish(
            false,
            function() {
                self.restart();
            }
        );
    },

    _onClear : function()
    {
		if (!this.ready) {
			return;
		}
		this.ready = false;
		this.disableObjects();
        
		game.data.score += (game.data.level + game.data.combo * 2) * game.data.hitScore;
        game.data.level++;
		game.data.combo++;

        var markSprite = new Mark(
            "correct",
            game.data.screenWidth / 2 - imgSize / 2,
            game.data.screenHeight / 2 - imgSize / 2
        );

        this.addChild(markSprite, 30);

        var self = this;
        this.finish(
            true,
            function() {
                self.restart();
            }
        );
    },

    finish : function(success, callback)
    {
        this.ready = false;
        var self = this;
        var finish = new me.Tween(this)
            .delay(800)
            .to({alpha: 0}, 400)
            .onComplete(function(){
                if (callback != null) {
                    callback();
                }
            })
            .start();
    },

	disableObjects: function() {
		for (var i = 0; i < this.objList.length; i++) {
			this.objList[i].disable();
		}
	},

    restart: function() {

        this.selectedObjs = [];
        while (this.objList.length > 0) {
            var elem = this.objList.shift();
            this.removeChild(elem);
            elem.destroy();
            elem = null;
        }
        this.objList = [];

        this._init();
        this.open();
    },

    open: function()
    {
        var alphaTween = new me.Tween(this)
            .to({alpha: 1}, 200)
            .start();

    },

    close: function()
    {
        var alphaTween = new me.Tween(this)
            .to({alpha: 0}, 200)
            .start();
    }
});
