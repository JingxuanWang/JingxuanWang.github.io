/**
 * Created by wang.jingxuan on 14-11-2.
 */
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
                [game.data.screenWidth / 4,     game.data.screenHeight / 4],
                [game.data.screenWidth / 2,     game.data.screenHeight / 4],
                [game.data.screenWidth * 3 / 4, game.data.screenHeight / 4],
                [game.data.screenWidth / 4,     game.data.screenHeight / 2],
                [game.data.screenWidth / 2,     game.data.screenHeight / 2],
                [game.data.screenWidth * 3 / 4, game.data.screenHeight / 2],
                [game.data.screenWidth / 4,     game.data.screenHeight * 3 / 4],
                [game.data.screenWidth / 2,     game.data.screenHeight * 3 / 4],
                [game.data.screenWidth * 3 / 4, game.data.screenHeight * 3 / 4]
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
                11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25
            ];
        }

        for(var i = 0; i < this.count; i++) {
            var index = Math.floor((Math.random() * array.length));
            var number = array.splice(index, 1);

            // create selectable number
            var elem = new SelectableObject(
                this.elemPositions[this.count][i][0] - 128,
                this.elemPositions[this.count][i][1] - 128,
                this.prefix + number,
                "frame",
                this.onSelect.bind(this),
                this.onDeselect.bind(this)
            );

            // insert into this.objList
            this.objList.push(elem);
            this.addChild(elem, 10);
        }
    },

    onSelect: function(spriteName) {
        var number = ~~(spriteName.replace(this.prefix, ""));
        if (this.selectedObjs.length == 0 ||
            number > this.selectedObjs[this.selectedObjs.length - 1]) {
            this._onCorrect(number);
        } else {
            this._onMiss();
        }

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
        var markSprite = new Mark(
            "miss",
            game.data.screenWidth / 2 - 128,
            game.data.screenHeight / 2 - 128
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
        game.data.score += (game.data.level + this.count) * game.data.hitScore;
        game.data.level++;

        var markSprite = new Mark(
            "correct",
            game.data.screenWidth / 2 - 128,
            game.data.screenHeight / 2 - 128
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
            this.fruits[id],
            this.headX,
            this.headY - 64 * index
        );

        sprite.open();
        this.addChild(sprite, 10 - index);
        return sprite;
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