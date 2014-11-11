/**
 * Created by wang.jingxuan on 14-11-8.
 */

function shuffle(o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function ajax(url, onSuccess, onError) {
    var xmlhttp = new XMLHttpRequest();

    if (xmlhttp.overrideMimeType) {
        xmlhttp.overrideMimeType("application/json");
    }

    xmlhttp.open("GET", url, true);

    // set the callbacks
    xmlhttp.ontimeout = onError;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            // status = 0 when file protocol is used, or cross-domain origin,
            // (With Chrome use "--allow-file-access-from-files --disable-web-security")
            if ((xmlhttp.status === 200) || ((xmlhttp.status === 0) && xmlhttp.responseText)) {
                // get the Texture Packer Atlas content
                //var data = JSON.parse();

                // fire the callback
                onSuccess(xmlhttp.responseText);
            }
            else {
                onError();
            }
        }
    };
    // send the request
    xmlhttp.send(null);
};
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
 * Created by wang.jingxuan on 14-11-9.
 */
var Avatar = me.Container.extend({
    init : function(x, y, userData) {

        this.speedNormal = 100;
        this.speedMax = 50;
        this.speedMin = 200;
        this.labelOffsetX = 170;
        this.labelOffsetY = 150;

        this._super(me.Container, 'init');

        this.animSprite = new me.AnimationSheet(x, y, {
                image: me.loader.getImage("caonima"),
                spritewidth: 240,
                spriteheight: 320
            }
        );

        this.userData = userData;

        this.animSprite.addAnimation("walk", [0, 1, 2, 3, 4], this.speedNormal);
        this.animSprite.setCurrentAnimation("walk");
        this.animSprite.setAnimationFrame(Math.floor(Math.random() * 4));

        this.label = new UILabel(
            x + this.labelOffsetX,
            y + this.labelOffsetY,
            {
                bitmapFont: true,
                text: this.userData.user_id + " : " + this.userData.score
            }
        );

        this.addChild(this.animSprite, 1);
        this.addChild(this.label, 2);
    },

    update: function(dt) {
        this.label.pos.x = this.animSprite.pos.x + this.labelOffsetX;
        this.label.pos.y = this.animSprite.pos.y + this.labelOffsetY;
        this.label.text = this.userData.user_id + "\n" + this.userData.score;
        return this._super(me.Container, 'update', [dt]);
    },

    speedUp: function (targetX, targetY) {
        this.animSprite.current.animationspeed = this.speedMax;

        this.moveToTop();
        this.animSprite.scaleFlag = true;
        var scaleTween = new me.Tween(this.animSprite.scale)
            .to({x: 1.5, y: 1.5}, 200)
            .easing(me.Tween.Easing.Linear.None)
            .start();

        this.moveEffect(targetX, targetY);
    },

    speedDown: function(targetX, targetY) {
        this.animSprite.current.animationspeed = this.speedMin;
        this.moveEffect(targetX, targetY);
    },

    moveEffect: function(targetX, targetY) {
        var self = this;
        var offsetTween = new me.Tween(this.animSprite.pos)
            .to({x: targetX, y: targetY}, 2000)
            .easing(me.Tween.Easing.Linear.None)
            .onComplete(function(){
                self.animSprite.current.animationspeed = self.speedNormal;

                self.animSprite.scaleFlag = true;
                var scaleTween = new me.Tween(self.animSprite.scale)
                    .to({x: 1, y: 1}, 200)
                    .easing(me.Tween.Easing.Linear.None)
                    .start();
            })
            .start();
    }
});
/**
 * Created by wang.jingxuan on 14-11-9.
 */
var game = {

    resources: [
        {name: "logo",        type:"image", src: "data/img/Logo.png"},
        {name: "32x32_font",  type:"image", src: "data/img/32x32_font.png"},
        {name: "caonima",     type:"image", src: "data/img/Caonima.png"}
    ],

    data: {
        screenWidth: 1280,
        screenHeight: 960
    },

    "onload": function() {

        // Initialize the video.
        if (!me.video.init("screen", me.video.CANVAS, game.data.screenWidth, game.data.screenHeight, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        me.state.set(me.state.LOADING, new game.LoadingScene());
        me.state.set(me.state.PLAY, new game.PlayScene());

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


game.PlayScene = me.ScreenObject.extend({
    onResetEvent: function() {
        // add background
        this.background = new me.ColorLayer("background", "#FFFFFF", 0);
        me.game.world.addChild(this.background, 0);

        this.avatars = {};
        this.userData = {};

        for (var i = 0; i < 30; i ++) {
            var avatar = new Avatar(
                game.data.screenWidth - 50,
                Math.random() * (game.data.screenHeight - 200),
                {
                    user_id: "ID: " + i,
                    score: 0
                }
            );
            this.avatars[avatar.userData.user_id] = avatar;
            //this.avatars.push(avatar);
            me.game.world.addChild(avatar, 100 - i);
        }

        // start timer
        me.timer.setInterval(this.updateData.bind(this), 3000, false);
    },

    updateData: function() {
        console.log("UpdateData Called");
        //ajax("http://localhost:8001/data.json", function(data) {
            //console.log(data);
        //    var newData = JSON.parse(data);
        //});
        var hiScore = null;
        var loScore = null;
        for (var user_id in this.avatars) {
            var avatar = this.avatars[user_id];

            // Debug! update avatar score
            var score = Math.floor(3000 * Math.random());
            if (score > avatar.userData.score) {
                avatar.userData.score = score;
            }

            // Update hiScore
            if (hiScore == null || avatar.userData.score > hiScore) {
                hiScore = avatar.userData.score;
            }

            // Update loScore
            if (loScore == null || avatar.userData.score < loScore) {
                loScore = avatar.userData.score;
            }
        }

        for (var user_id in this.avatars) {
            var avatar = this.avatars[user_id];
            var percentage = (avatar.userData.score - loScore) / (hiScore - loScore);
            var targetX = 800 - percentage * (800 - 100);

            if (targetX < avatar.animSprite.pos.x) {
                me.game.world.moveToTop(avatar);
                avatar.speedUp(targetX, avatar.animSprite.pos.y);
            } else {
                avatar.speedDown(targetX, avatar.animSprite.pos.y);
            }
        }
    },

    _onDataFetched: function(response) {
        console.log(response);
    },

    onDestroyEvent: function() {
        // remove the hud from the game world
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
