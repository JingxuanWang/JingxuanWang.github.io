/**
 * Created by wang.jingxuan on 14-11-2.
 */

game.data.gameId = 1003;
game.data.title = "从小到大";

var imgSize = 202;

var Round = me.Container.extend({

    init: function() {

        this.prefix = "number-";

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
    },

    _init: function() {
        game.data.roundStartTime = game.data.curTime;
        this.ready = true;
        if (game.data.level < this.countArray.length) {
            this.count = this.countArray[game.data.level - 1];
        } else {
            this.count = this.countArray[this.countArray.length - 1];
        }

        this.objList = [];
        this.selectedObjs = [];

        var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        if (game.data.level >= 5) {
            array = [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        }


        for(var i = 0; i < this.count; i++) {
            var index = Math.floor((Math.random() * array.length));
            var number = array.splice(index, 1);
            var frameName = "circle-";
            if (number >= 0) {
                frameName += ~~(number);
            } else {
                var frameNumber = 10 + ~~(number);
                frameName += frameNumber;
            }
            // create selectable number
            var elem = new SelectableObject(
                this.elemPositions[this.count][i][0] - imgSize / 2,
                this.elemPositions[this.count][i][1] - imgSize / 2 + 70,
                this.prefix + number,
                frameName,
                this.onSelect.bind(this),
                this.onDeselect.bind(this),
                imgSize
            );

            // insert into this.objList
            this.objList.push(elem);
            this.addChild(elem, 10);
       	}
		
		var self = this;
		this.numList = this.objList.map(function(elem) {
			return ~~(elem.spriteName.replace(self.prefix, ""));
		}).sort(function(a, b) {
			return a - b;
		});

    },

    onSelect: function(spriteName) {
        var number = ~~(spriteName.replace(this.prefix, ""));

		// if we selected the wrong one, treated as error
		if (this.numList[this.selectedObjs.length] < number) {
			this._onMiss();
			return;
		}

        if (this.selectedObjs.length == 0 ||
            number > this.selectedObjs[this.selectedObjs.length - 1]) {
            this._onCorrect(number);
        } else {
            this._onMiss();
        }
		
		game.data.score += game.data.hitScore;

        return true;
    },

    onDeselect: function(spriteName) {
        var number = spriteName.replace(this.prefix, "");

        if (number == this.selectedObjs[this.selectedObjs.length - 1]) {
            this.selectedObjs.pop();
            return true;
        }

        return false;
    },

    _onCorrect : function(number)
    {
        this.selectedObjs.push(number);

        if (this.selectedObjs.length == this.count) {
            this._onClear();
        }
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
        game.data.round++;
		if (game.data.level < 1) {
			game.data.level = 1;
		}

        this.addChild(new Miss(game.data.screenWidth / 2, game.data.screenHeight / 2 + 70), 30);

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
        game.data.round++;
        game.data.correct_count++;

        this.addChild(new Correct(game.data.screenWidth / 2, game.data.screenHeight / 2 + 70), 30);

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

    _spawn: function(index)
    {
        var id = this.leftId;
        if (Math.random() > 0.5)
        {
            id = this.rightId;
        }

        var sprite = new Fruit(
            this.elems[id],
            this.headX,
            this.headY - 64 * index
        );

        sprite.open();
        this.addChild(sprite, 10 - index);
        return sprite;
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
