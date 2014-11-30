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
    //{name: "fruit-1",      type:"image", src: "data/img/speed_sort/0.png"},
    //{name: "fruit-2",      type:"image", src: "data/img/speed_sort/1.png"},
    //{name: "fruit-3",      type:"image", src: "data/img/speed_sort/2.png"},
    //{name: "fruit-4",      type:"image", src: "data/img/speed_sort/3.png"},

    {name: "fruit-1",      type:"image", src: "data/img/Banana.png"},
    {name: "fruit-2",      type:"image", src: "data/img/Grape.png"},
    {name: "fruit-3",      type:"image", src: "data/img/Cherry.png"},
    {name: "fruit-4",      type:"image", src: "data/img/Pear.png"},

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
    {name: "icon-10",    type:"image", src: "data/img/matching_pair/mp_shape_9.png"},
    {name: "icon-11",    type:"image", src: "data/img/matching_pair/mp_shape_10.png"},
    {name: "icon-12",    type:"image", src: "data/img/matching_pair/mp_shape_11.png"},
    {name: "icon-13",    type:"image", src: "data/img/matching_pair/mp_shape_12.png"},
    {name: "icon-14",    type:"image", src: "data/img/matching_pair/mp_shape_13.png"},
    {name: "icon-15",    type:"image", src: "data/img/matching_pair/mp_shape_14.png"},
    {name: "icon-16",    type:"image", src: "data/img/matching_pair/mp_shape_15.png"},
    {name: "icon-17",    type:"image", src: "data/img/matching_pair/mp_shape_16.png"},
    {name: "icon-18",    type:"image", src: "data/img/matching_pair/mp_shape_17.png"},
    {name: "icon-19",    type:"image", src: "data/img/matching_pair/mp_shape_18.png"},
    {name: "icon-20",    type:"image", src: "data/img/matching_pair/mp_shape_19.png"},

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
 * Created by wang.jingxuan on 14/11/5.
 */
var SelectableObject = me.Container.extend({
    init : function(x, y, spriteName, frameName, onSelect, onDeselect, targetSize) {
        this._super(me.Container, 'init');

        this.spriteName = spriteName;
        this.sprite = new me.Sprite(x, y, me.loader.getImage(spriteName));
        this.frame = new me.Sprite(x, y, me.loader.getImage(frameName));
        this.frame.alpha = 0;

        this.targetSize = targetSize == null ? 128 : targetSize;
        this.targetScale = this.targetSize / this.sprite.width;

        this.sprite.resize(0.05, 0.05);

        this.addChild(this.sprite, 1);
        this.addChild(this.frame, 2);

        this.isSelected = false;
        this.onSelect = onSelect;
        this.onDeselect = onDeselect;

        this.collider = new me.Rect(x, y, targetSize, targetSize);
        me.input.registerPointerEvent('pointerup', this.collider, this.onPointerUp.bind(this));

        this.open();
    },

    open: function () {
        this.frame.resize(this.targetScale + 0.05, this.targetScale + 0.05);

        var self = this;
        var scaleTween = new me.Tween(this.sprite.scale)
            .to({x: self.targetScale, y: self.targetScale}, 200)
            .onComplete(function() {
                self.resize(self.targetScale, self.targetScale);
                self.scaleFlag = true;
                self.isScaling = false;
            })
            .start();
    },

    onPointerUp : function() {
        if (this.isSelected) {
            if (this.onDeselect != null && this.onDeselect(this.spriteName)) {
                this.isSelected = !this.isSelected;
                this.frame.alpha = 1 - this.frame.alpha;
            }
        } else {
            if (this.onSelect != null && this.onSelect(this.spriteName)) {
                this.isSelected = !this.isSelected;
                this.frame.alpha = 1 - this.frame.alpha;
            }
        }
    },

    destroy: function() {
        me.input.releasePointerEvent("pointerup", this.collider);

        this._super(me.Container, 'destroy');

        this.collider = null;
        this.sprite = null;
        this.frame = null;
    }
});
/**
 * Created by wang.jingxuan on 14-11-2.
 */

game.data.gameId = 1002;

var imgSize = 183;

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
        this.ready = true;
        if (game.data.level < this.countArray.length) {
            this.count = this.countArray[game.data.level - 1];
        } else {
            this.count = this.countArray[this.countArray.length - 1];
        }
        this.objList = [];
        this.selectedObjs = [];

        var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];


        for(var i = 0; i < this.count; i++) {
            var index = Math.floor((Math.random() * array.length));
            var number = array.splice(index, 1);

            // create selectable number
            var elem = new SelectableObject(
                this.elemPositions[this.count][i][0] - imgSize / 2,
                this.elemPositions[this.count][i][1] - imgSize / 2,
                this.prefix + number,
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
        game.data.score += (game.data.level + this.count) * game.data.hitScore;
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
