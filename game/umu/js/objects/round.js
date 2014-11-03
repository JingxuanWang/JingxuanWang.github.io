/**
 * Created by wang.jingxuan on 14-11-2.
 */
var Round = me.Container.extend({

    init: function(restart) {

        this._super(me.Container, 'init');

        this._init();
    },

    _init: function() {

        this.alpha = 1;

        // set legend
        this.leftId = Math.floor((Math.random() * game.data.fruits.length));
        this.rightId = Math.floor((Math.random() * game.data.fruits.length));

        if (this.leftId == this.rightId)
        {
            this.leftId = (this.leftId + 1) % game.data.fruits.length;
        }

        console.log(this.leftId + " : " + this.rightId);

        this.leftSprite = new Fruit(
            game.data.fruits[this.leftId],
            0,
            game.data.screenHeight - 1.75 * 256
        );

        this.rightSprite = new Fruit(
            game.data.fruits[this.rightId],
            game.data.screenWidth - 256,
            game.data.screenHeight - 1.75 * 256
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
            game.data.screenHeight - 256,
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
            game.data.screenWidth - 256,
            game.data.screenHeight - 256,
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

        this.headX = game.data.screenWidth / 2 - 128;
        this.headY = game.data.screenHeight - 1.75 * 256;

        this.objList = [];
        for (var i = 0; i < game.data.count; i ++)
        {
            var sprite = this._spawn(i);
            this.objList.push(sprite);
        }

        this.curObj = this.objList.shift();

        this.ready = true;
    },

    _onCorrect : function(legendSprite)
    {
        console.log("OnCorrect");
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
        console.log("OnMiss");

        var markSprite = new Mark(
            "miss",
            game.data.screenWidth / 2 - 128,
            game.data.screenHeight / 2 - 128
        );

        this.addChild(markSprite, 30);

        this._onFinish(false);
    },

    _onClear : function()
    {
        console.log("OnClear");

        game.data.score += game.data.count * game.data.hitScore;
        if (game.data.count < game.data.count_max) {
            game.data.count++;
        }

        var markSprite = new Mark(
            "correct",
            game.data.screenWidth / 2 - 128,
            game.data.screenHeight / 2 - 128
        );

        this.addChild(markSprite, 30);

        this._onFinish(true);
    },

    _onFinish : function(success)
    {
        console.log("OnFinish : " + success);

        this.ready = false;
        var self = this;
        var finish = new me.Tween(this)
            .delay(800)
            .to({alpha: 0}, 400)
            .onComplete(function(){
                //me.state.change(me.state.MENU);
                self.restart();
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
            game.data.fruits[id],
            this.headX,
            this.headY - 64 * index
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