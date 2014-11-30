var game = {
    data: {
        score : 0,
        hitScore : 10,
        level : 1,
        totalTime: 60,
        curTime: 0,
        startTime: 0,

        screenWidth: 640,
        screenHeight: 960,

        spriteSize: 192,
        margin: 0,

        playerId: Math.floor(Math.random() * 100000),
        apiUrl: "http://pd.iuv.net/game.php"
    },

    "onload": function() {

        // Initialize the video.
        if (!me.video.init("screen", me.video.CANVAS, game.data.screenWidth, game.data.screenHeight, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        me.state.set(me.state.LOADING, new game.LoadingScene());
        me.state.set(me.state.PLAY, new game.PlayScene());
        me.state.set(me.state.GAMEOVER, new game.GameOverScene());

        me.loader.load(
            {name: "logo", type:"image", src: "data/img/Logo.png"},
            this.onLogoLoaded.bind(this)
        );
    },

    "onLogoLoaded" : function() {
        // Load the resources.
        me.loader.preload(game.resources);
        me.loader.onload = this.loaded;

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

    "loaded": function() {
        // Start the game.
        me.state.change(me.state.PLAY);
    }
};

game.resources = [
    // logo
    {name: "logo",        type:"image", src: "data/img/Logo.png"},

    // common ui
    {name: "left",        type:"image", src: "data/img/Left.png"},
    {name: "right",       type:"image", src: "data/img/Right.png"},
    {name: "correct",     type:"image", src: "data/img/Correct.png"},
    {name: "miss",        type:"image", src: "data/img/Miss.png"},
    {name: "quit",        type:"image", src: "data/img/Quit.png"},
    {name: "retry",       type:"image", src: "data/img/Retry.png"},
    //{name: "frame",       type:"image", src: "data/img/Frame.png"},

    {name: "button",      type:"image", src: "data/img/speed_sort/button.png"},
    {name: "background",  type:"image", src: "data/img/speed_sort/back.png"},
    {name: "frame",       type:"image", src: "data/img/matching_pair/mp_highlighted.png"},

    // fruits
    {name: "fruit-1",      type:"image", src: "data/img/speed_sort/0.png"},
    {name: "fruit-2",      type:"image", src: "data/img/speed_sort/1.png"},
    {name: "fruit-3",      type:"image", src: "data/img/speed_sort/2.png"},
    {name: "fruit-4",      type:"image", src: "data/img/speed_sort/3.png"},

    // food
    {name: "food-1",       type:"image", src: "data/img/speed_sort/4.png"},
    {name: "food-2",       type:"image", src: "data/img/speed_sort/5.png"},
    {name: "food-3",       type:"image", src: "data/img/speed_sort/6.png"},
    {name: "food-4",       type:"image", src: "data/img/speed_sort/7.png"},

    // dessert
    //{name: "dessert-1",    type:"image", src: "data/img/speed_sort/8.png"},
    //{name: "dessert-2",    type:"image", src: "data/img/speed_sort/9.png"},
    //{name: "dessert-3",    type:"image", src: "data/img/speed_sort/10.png"},
    //{name: "dessert-4",    type:"image", src: "data/img/speed_sort/11.png"},
    //{name: "dessert-5",    type:"image", src: "data/img/speed_sort/12.png"},
    //{name: "dessert-6",    type:"image", src: "data/img/speed_sort/13.png"},

    // numbers
    {name: "number-1",    type:"image", src: "data/img/matching_pair/mp_num_1.png"},
    {name: "number-2",    type:"image", src: "data/img/matching_pair/mp_num_2.png"},
    {name: "number-3",    type:"image", src: "data/img/matching_pair/mp_num_3.png"},
    {name: "number-4",    type:"image", src: "data/img/matching_pair/mp_num_4.png"},
    {name: "number-5",    type:"image", src: "data/img/matching_pair/mp_num_5.png"},
    {name: "number-6",    type:"image", src: "data/img/matching_pair/mp_num_6.png"},
    {name: "number-7",    type:"image", src: "data/img/matching_pair/mp_num_7.png"},
    {name: "number-8",    type:"image", src: "data/img/matching_pair/mp_num_8.png"},
    {name: "number-9",    type:"image", src: "data/img/matching_pair/mp_num_9.png"},

	// icons
    {name: "icon-1",    type:"image", src: "data/img/matching_pair/mp_shape_0.png"},
    {name: "icon-2",    type:"image", src: "data/img/matching_pair/mp_shape_1.png"},
    {name: "icon-3",    type:"image", src: "data/img/matching_pair/mp_shape_2.png"},
    {name: "icon-4",    type:"image", src: "data/img/matching_pair/mp_shape_3.png"},
    {name: "icon-5",    type:"image", src: "data/img/matching_pair/mp_shape_4.png"},
    {name: "icon-6",    type:"image", src: "data/img/matching_pair/mp_shape_5.png"},
    {name: "icon-7",    type:"image", src: "data/img/matching_pair/mp_shape_6.png"},
    {name: "icon-8",    type:"image", src: "data/img/matching_pair/mp_shape_7.png"},
    {name: "icon-9",    type:"image", src: "data/img/matching_pair/mp_shape_8.png"},
    {name: "icon-10",   type:"image", src: "data/img/matching_pair/mp_shape_9.png"},
    {name: "icon-11",   type:"image", src: "data/img/matching_pair/mp_shape_10.png"},
    {name: "icon-12",   type:"image", src: "data/img/matching_pair/mp_shape_11.png"},
    {name: "icon-13",   type:"image", src: "data/img/matching_pair/mp_shape_12.png"},
    {name: "icon-14",   type:"image", src: "data/img/matching_pair/mp_shape_13.png"},
    {name: "icon-15",   type:"image", src: "data/img/matching_pair/mp_shape_14.png"},
    {name: "icon-16",   type:"image", src: "data/img/matching_pair/mp_shape_15.png"},
    {name: "icon-17",   type:"image", src: "data/img/matching_pair/mp_shape_16.png"},
    {name: "icon-18",   type:"image", src: "data/img/matching_pair/mp_shape_17.png"},
    {name: "icon-19",   type:"image", src: "data/img/matching_pair/mp_shape_18.png"},
    {name: "icon-20",   type:"image", src: "data/img/matching_pair/mp_shape_19.png"},

    // font
    {name: "32x32_font",  type:"image", src: "data/img/32x32_font.png"}
];

/**
 * Created by wang.jingxuan on 14-11-8.
 */

function shuffle(o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


function ajax(method, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    if (xhr.overrideMimeType) {
        xhr.overrideMimeType("application/json");
    }

    xhr.open(method, url, true);

    //console.log(method + " : " + url);

    // set the callbacks
    xhr.ontimeout = onError;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            // status = 0 when file protocol is used, or cross-domain origin,
            // (With Chrome use "--allow-file-access-from-files --disable-web-security")
            if ((xhr.status === 200) || ((xhr.status === 0) && xhr.responseText)) {
                if (onSuccess != null) {
                    // fire the callback
                    onSuccess(xhr.responseText);
                }
            }
            else {
                if (onError != null) {
                    onError();
                }
            }
        }
    };
    // send the request
    xhr.send(null);
};

var QueryString = function () {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [ query_string[pair[0]], pair[1] ];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
} ();
/**
 * Created by wang.jingxuan on 14-11-3.
 */
var UIButton = me.Sprite.extend({
    init: function(x, y, settings) {

        settings = settings || {};

        me.Sprite.prototype.init.apply(
            this,
            [
                x,
                y,
                me.loader.getImage(settings.imageName),
                settings.width || 256,
                settings.height || 256
            ]
        );

        // will do scale anim
        this.scaleFlag = true;

        this.touchStartTween = new me.Tween(this.scale);
        this.touchEndTween = new me.Tween(this.scale);

        this.onclick = settings.onclick;
        this.alwaysUpdate = true;

        me.input.registerPointerEvent('pointerdown', this, this.onPointerDown.bind(this));
        me.input.registerPointerEvent('pointerup', this, this.onPointerUp.bind(this));
    },

    update: function() {
        // force update
        return true;
    },

    onPointerDown: function() {
        var self = this;
        this.touchEndTween.stop();
        this.touchStartTween
            .to({x: 0.75, y: 0.75}, 100)
            .onComplete(function(){
                self.resize(1, 1);
                self.scaleFlag = true;
            })
            .start();
    },

    onPointerUp: function () {
        var self = this;
        this.touchStartTween.stop();
        this.touchEndTween.
            to({x: 1, y: 1}, 100)
            .onComplete(function(){
                self.resize(1, 1);
                self.scaleFlag = true;
            })
            .start();

        if (this.onclick != null) {
            this.onclick();
        }
    },

    onDestroyEvent: function() {
        me.input.releasePointerEvent("pointerdown", this);
        me.input.releasePointerEvent("pointerup", this);
    }
});
/**
 * Created by wang.jingxuan on 14-11-3.
 */
var UILabel = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y, settings) {

        this.settings = settings || {};

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);

        if (this.settings.bitmapFont == true) {
            // create a font
            this.font = new me.BitmapFont(
                this.settings.font || "32x32_font",
                this.settings.size || 32,
                this.settings.scale || null,     // no resize
                this.settings.firstChar || null  // 0x20 for default
            );

            this.font.set(
                this.settings.textAlign || "left"
            );
        }
        else
        {
            this.font = new me.Font(
                this.settings.font  || "Arial",
                this.settings.size  || 32,
                this.settings.fillStyle || "black",
                this.settings.textAlign || "left"
            );
        }

        // make sure we use screen coordinates
        this.floating = true;

        this.text = this.settings.text || "NEW LABEL";
    },

    /**
     * draw the score
     */
    draw : function (context) {
        if (this.settings.bitmapFont == true) {
            this.font.draw (context, this.text, this.pos.x, this.pos.y);
        } else {
            var ctx = context.getContext();
            this.font.measureText(ctx, this.text);
            this.font.draw (ctx, this.text, this.pos.x, this.pos.y);
        }
    }
});
/**
 * Created by wang.jingxuan on 14-11-2.
 */
var Fruit = me.Sprite.extend({
    init: function(imageName, x, y, imgSize) {
        me.Sprite.prototype.init.apply(this, [x, y, me.loader.getImage(imageName), imgSize, imgSize]);

        this.imageName = imageName;

        //this.alpha = 0;
        this.resize(0.05, 0.05);

        //this.targetScale = game.data.spriteSize / imgSize;
        this.targetScale = 1;
        console.log(this.targetScale);

        this.isScaling = false;

    },

    update : function(dt) {
        // force update
        return true;
    },

    open: function () {
        var self = this;
        var scaleTween = new me.Tween(this.scale)
            .to({x: self.targetScale, y: self.targetScale}, 200)
            .onComplete(function() {
                self.resize(self.targetScale, self.targetScale);
                self.scaleFlag = true;
                self.isScaling = false;
            })
            .start();
    },

    move: function(legendSprite) {
        var offsetTween = new me.Tween(this.pos)
            .to({x: legendSprite.pos.x, y: legendSprite.pos.y}, 200)
            .easing(me.Tween.Easing.Linear.None)
            .start();
    },

    close: function () {
        var alphaTween = new me.Tween(this)
            .to({alpha: 0}, 200)
            .easing(me.Tween.Easing.Linear.None)
            .start();
    }
});
/**
 * Created by wang.jingxuan on 14-11-2.
 */
var Arrow = UIButton.extend({
    init: function(direction, legendSprite, x, y, imageWidth, imageHeight, onclick) {

        this._super(UIButton, 'init',
            [x, y, {
                imageName: "button",
                onclick: onclick,
                width: imageWidth,
                height: imageHeight
            }]
        );

        this.xScale = 1;
        if (direction == "right") {
            this.flipX(true);
            this.xScale = -1;
        }

        this.legendSprite = legendSprite;
    },

    onPointerDown: function() {
        var self = this;
        this.touchEndTween.stop();
        this.touchStartTween
            .to({x: self.xScale * 0.75, y: 0.75}, 100)
            .onComplete(function(){
                self.resize(self.xScale * 1, 1);
                self.scaleFlag = true;
            })
            .start();
    },

    onPointerUp: function () {
        //console.log("OnPointerUp");
        var self = this;
        this.touchStartTween.stop();
        this.touchEndTween.to({x: self.xScale * 1, y: 1}, 100)
            .onComplete(function(){
                self.resize(self.xScale * 1, 1);
                self.scaleFlag = true;
            })
            .start();

        if (this.onclick != null) {
            this.onclick(self.legendSprite);
        }
    },
});
/**
 * Created by wang.jingxuan on 14-11-2.
 */
/**
 * Created by wang.jingxuan on 14-11-2.
 */
var Mark = me.Sprite.extend({
    init: function(imageName, x, y) {
        me.Sprite.prototype.init.apply(this, [x, y, me.loader.getImage(imageName), 256, 256]);

        this.alpha = 0;
        this.imageName = imageName;

        this.fadeIn = new me.Tween(this);
        this.fadeOut = new me.Tween(this);

        this.fadeIn
            .to({alpha: 1}, 200)
            .chain(this.fadeOut.to({alpha: 0}, 400))
            .start();

        this.alwaysUpdate = true;
    },

    update: function() {
        // force update
        return true;
    }
});
/**
 * Created by wang.jingxuan on 14-11-3.
 */
var Retry = UIButton.extend({
    // constructor
    init: function() {

        this._super(UIButton, 'init',
            [
                game.data.screenWidth / 2 - 128,
                game.data.screenHeight / 2,
                {
                    imageName: "retry",
                    onclick: function() {
                        me.state.change(me.state.PLAY);
                    }
                }
            ]
        );
    }
});
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
        this.addChild(new game.hud.ScoreItem(0, 0));
        this.addChild(new game.hud.TimeItem(0, 50));
    }
});

/**
 * a basic hud item to display score
 */

game.hud.ScoreItem = UILabel.extend({
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

game.hud.TimeItem = UILabel.extend({
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
 * Created by wang.jingxuan on 14-11-2.
 */

game.data.gameId = 1003;
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

        this.countMax = 9;
        this.countInit = 5;
        this.count = this.countInit;

        this._super(me.Container, 'init');

        this._init();
    },

    _init: function() {

        this.alpha = 0;

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
        if (this.count < this.countMax) {
            this.count++;
            game.data.level++;
        }

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
/**
 * Created by wang.jingxuan on 14/11/4.
 */
game.LoadingScene = me.ScreenObject.extend({
    // call when the loader is reset
    onResetEvent : function () {
        me.game.reset();

        // background color
        me.game.world.addChild(new me.ColorLayer("background", "#FFFFFF", 0));

        // progress bar
        var progressBar = new ProgressBar(
            new me.Vector2d(),
            game.data.screenWidth,
            //me.video.renderer.getHeight()
            20
        );
        this.handle = me.event.subscribe(
            me.event.LOADER_PROGRESS,
            progressBar.onProgressUpdate.bind(progressBar)
        );
        me.game.world.addChild(progressBar, 1);

        // melonJS text & logo
        var icon = new me.Sprite(
            game.data.screenWidth / 2 - 336,
            game.data.screenHeight / 2 - 177,
            me.loader.getImage("logo"),
            672,
            354
        );

        me.game.world.addChild(icon, 1);
    },

    // destroy object at end of loading
    onDestroyEvent : function () {
        // cancel the callback
        if (this.handle)  {
            me.event.unsubscribe(this.handle);
            this.handle = null;
        }
    }
});

// a basic progress bar object
var ProgressBar = me.Renderable.extend({

    init: function (v, w, h) {
        me.Renderable.prototype.init.apply(this, [v.x, v.y, w, h]);
        // flag to know if we need to refresh the display
        this.invalidate = false;

        // default progress bar height
        this.barHeight = 40;

        // current progress
        this.progress = 0;
    },

    // make sure the screen is refreshed every frame
    onProgressUpdate : function (progress) {
        this.progress = Math.floor(progress * this.width);
        this.invalidate = true;
    },

    // make sure the screen is refreshed every frame
    update : function () {
        if (this.invalidate === true) {
            // clear the flag
            this.invalidate = false;
            // and return true
            return true;
        }
        // else return false
        return false;
    },

    // draw function
    draw : function (renderer) {
        var context = renderer.getContext();
        // draw the progress bar
        context.fillStyle = "black";
        context.fillRect(0, (this.height / 2) - (this.barHeight / 2), this.width, this.barHeight);
        context.fillStyle = "#55aa00";
        context.fillRect(2, (this.height / 2) - (this.barHeight / 2), this.progress, this.barHeight);
    }
});
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

game.GameOverScene = me.ScreenObject.extend({
    init: function() {
    },

    onResetEvent: function() {

        this.background = new me.ColorLayer("background", "#FFFFFF", 90);
        //this.background.alpha = 0.75;
        me.game.world.addChild(this.background, 0);

        ajax(
            "GET",
            game.data.apiUrl + "?m=post&game_id=" + game.data.gameId
            + "&user_id=" + game.data.playerId
            + "&score=" + game.data.score
        );

        this.dialog = new UILabel(
            game.data.screenWidth / 2,
            game.data.screenHeight / 2 - 256,
            {
                bitmapFont: true,
                textAlign: "center",
                text: "TIME'S UP\n\nID: " + game.data.playerId + "\n\nSCORE: " + game.data.score
            }
        )

        me.game.world.addChild(this.dialog, 101);

        this.retry = new Retry();
        me.game.world.addChild(this.retry, 100);

    },

    onDestroyEvent: function() {
        me.game.world.addChild(this.dialog);
        me.game.world.addChild(this.retry);
        this.dialog = null;
        this.retry = null;
    }
});
