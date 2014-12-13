/**
 * Created by wang.jingxuan on 14-11-2.
 */

game.data.gameId = 1002;
var imgSize = 220;

var Round = me.Container.extend({

    init: function(restart) {

        this.elems = [
            "fruit-1",
            "fruit-2",
            "fruit-3",
            "fruit-4",
            "food-1",
            "food-2",
            "food-3",
            "food-4"
        ];

        this.count = this.countInit;
        this.countArray = [4, 5, 6, 7, 8, 9];
        
        this._super(me.Container, 'init');

        this._init();
   },

    _init: function() {

        this.alpha = 0;

		if (game.data.level < this.countArray.length) {
            this.count = this.countArray[game.data.level - 1];
        } else {
            this.count = this.countArray[this.countArray.length - 1];
        }

		console.log(this.count + " : " + game.data.level);

        // set legend
        this.leftId = Math.floor((Math.random() * this.elems.length));
        this.rightId = Math.floor((Math.random() * this.elems.length));

        if (this.leftId == this.rightId)
        {
            this.leftId = (this.leftId + 1) % this.elems.length;
        }

        this.leftSprite = new Fruit(
            this.elems[this.leftId],
            0,
            game.data.screenHeight - 2 * imgSize
        );

        this.rightSprite = new Fruit(
            this.elems[this.rightId],
            game.data.screenWidth - imgSize,
            game.data.screenHeight - 2 * imgSize
        );

        this.leftSprite.open();
        this.rightSprite.open();

        this.addChild(this.leftSprite, 20);
        this.addChild(this.rightSprite, 20);

        var self = this;

        this.leftArrow = new Arrow(
            "left",
            this.leftSprite,
            0,
            game.data.screenHeight - imgSize,
            imgSize,
            imgSize,
            function(legendSprite) {
                if (!self.ready) {
                    return;
                }
                if (self.curObj.imageName == legendSprite.imageName)
                {
                    self._onCorrect(legendSprite);
                }
                else
                {
                    self._onMiss();
                }
            }
        );
        this.rightArrow = new Arrow(
            "right",
            this.rightSprite,
            game.data.screenWidth - imgSize,
            game.data.screenHeight - imgSize,
            imgSize,
            imgSize,
            function(legendSprite) {
                if (!self.ready) {
                    return;
                }
                if (self.curObj.imageName == legendSprite.imageName)
                {
                    self._onCorrect(legendSprite);
                }
                else
                {
                    self._onMiss();
                }
            }
        );

        this.addChild(this.leftArrow);
        this.addChild(this.rightArrow);

        this.headX = game.data.screenWidth / 2 - imgSize / 2;
        this.headY = game.data.screenHeight - 2 * imgSize;

        this.objList = [];
        for (var i = 0; i < this.count; i ++)
        {
            var sprite = this._spawn(i);
            this.objList.push(sprite);
        }

        this.curObj = this.objList.shift();

        this.ready = true;
    },

    _onCorrect : function(legendSprite)
    {
        var detachedObj = this.curObj;
        detachedObj.move(legendSprite);
        detachedObj.close();

        game.data.score += game.data.hitScore;

        var self = this;
        var delayedRemove = new me.Tween()
            .delay(400)
            .onComplete(function() {
                self.removeChild(detachedObj);
            })
            .start();

        if (this.objList.length > 0) {
            this.curObj = this.objList.shift();
            this.curObj.move(detachedObj);

            var prevObj = this.curObj;
            for (var i = 0; i < this.objList.length; i++) {
                this.objList[i].move(prevObj);
                prevObj = this.objList[i];
            }
        }
        else {
            this._onClear();
        }

    },

    _onMiss : function()
    {

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
        game.data.score += this.count * game.data.hitScore;
        game.data.level++;

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
            this.headY - imgSize / 4 * index,
            imgSize
        );

        sprite.open();
        this.addChild(sprite, 10 - index);
        return sprite;
    },

    restart: function() {
        this.removeChild(this.leftArrow);
        this.removeChild(this.rightArrow);
        this.removeChild(this.leftSprite);
        this.removeChild(this.rightSprite);
        this.removeChild(this.curObj);

        while(this.objList.length > 0)
        {
            this.removeChild(this.objList.shift());
        }

        this.leftArrow = null;
        this.rightArrow = null;
        this.leftSprite = null;
        this.rightArrow = null;
        this.curObj = null;
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
