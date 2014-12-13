var game = {
    data: {
        
		score : 0,
        hitScore : 10,
		maxScore : 3000,
		totalRank : 10000,
        
		level : 1,
        totalTime: 45,
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

// convert game info from string into hash
// Should be a string of game_id:game_score,game_id:game_score ...
function deserializeGameInfo(game_str) {
	var parsed_game_info = {};
	
	if (game_str === undefined || game_str === null || game_str == "") {
		return parsed_game_info;
	}
	
	game_str.split(',').map(function(game) {
		
		if (game !== undefined) {
			var values = game.split(':');
			
			if (values[0] !== undefined && values[1] !== undefined) {
				parsed_game_info[values[0]] = values[1];
				//console.log(values[0] + " : " + values[1]);
			}
		}
	});

	return parsed_game_info;
}

// convert game info into string
// Should be a string of game_id:game_score,game_id:game_score ...
function serializeGameInfo(games) {
	return Object.keys(games).map(function(key) {
		return key + ":" + games[key];
	}).join(',');
} 

// From https://github.com/errcw/gaussian

// Complementary error function
// From Numerical Recipes in C 2e p221
function erfc(x) {
  var z = Math.abs(x);
  var t = 1 / (1 + z / 2);
  var r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 +
          t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 +
          t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 +
          t * (-0.82215223 + t * 0.17087277)))))))))
  return x >= 0 ? r : 2 - r;
};

// Inverse complementary error function
// From Numerical Recipes 3e p265
function ierfc(x) {
  if (x >= 2) { return -100; }
  if (x <= 0) { return 100; }

  var xx = (x < 1) ? x : 2 - x;
  var t = Math.sqrt(-2 * Math.log(xx / 2));

  var r = -0.70711 * ((2.30753 + t * 0.27061) /
          (1 + t * (0.99229 + t * 0.04481)) - t);

  for (var j = 0; j < 2; j++) {
    var err = erfc(r) - xx;
    r += err / (1.12837916709551257 * Math.exp(-(r * r)) - r * err);
  }

  return (x < 1) ? r : -r;
};

// Construct a new distribution from the precision and precisionmean
function fromPrecisionMean(precision, precisionmean) {
  return gaussian(precisionmean/precision, 1/precision);
};

// Models the normal distribution
var Gaussian = function(mean, variance) {
  if (variance <= 0) {
    throw new Error('Variance must be > 0 (but was ' + variance + ')');
  }
  this.mean = mean;
  this.variance = variance;
  this.standardDeviation = Math.sqrt(variance);
}
// Probability density function
Gaussian.prototype.pdf = function(x) {
  var m = this.standardDeviation * Math.sqrt(2 * Math.PI);
  var e = Math.exp(-Math.pow(x - this.mean, 2) / (2 * this.variance));
  return e / m;
};

// Cumulative density function
Gaussian.prototype.cdf = function(x) {
  return 0.5 * erfc(-(x - this.mean) / (this.standardDeviation * Math.sqrt(2)));
};

// Add distribution of this and d
Gaussian.prototype.add = function(d) {
  return gaussian(this.mean + d.mean, this.variance + d.variance);
};

// Subtract distribution of this and d
Gaussian.prototype.sub = function(d) {
  return gaussian(this.mean - d.mean, this.variance + d.variance);
};

// Scales this distribution by constant c
Gaussian.prototype.scale = function(c) {
  return gaussian(this.mean*c, this.variance*c*c);
};

Gaussian.prototype.mul = function(d) {
  if(typeof(d)==="number"){ return this.scale(d); }
  var precision = 1/this.variance;
  var dprecision = 1/d.variance;
  return fromPrecisionMean(precision+dprecision, 
    precision*this.mean+dprecision*d.mean);
};

Gaussian.prototype.div = function(d) {
  if(typeof(d)==="number"){ return this.scale(1/d); }
  var precision = 1/this.variance;
  var dprecision = 1/d.variance;
  return fromPrecisionMean(precision-dprecision, 
    precision*this.mean-dprecision*d.mean);
};

Gaussian.prototype.ppf = function(x) {
  return this.mean - this.standardDeviation * Math.sqrt(2) * ierfc(2 * x);
};


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
                game.data.screenWidth / 4 * 3 - 128,
                game.data.screenHeight / 2 + 128,
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
 * Created by wang.jingxuan on 14-11-3.
 */
var ReturnToIndex = UIButton.extend({
    // constructor
    init: function() {

        this._super(UIButton, 'init',
            [
                game.data.screenWidth / 4 - 128 - 5,
                game.data.screenHeight / 2 + 128,
                {
                    imageName: "quit",
                    onclick: function() {
                    	window.location.href = "./index.html";    
                    }
                }
            ]
        );
    }
});

/**
 * Created by wang.jingxuan on 14-12-6.
 */
var Upload = UIButton.extend({
    // constructor
    init: function(onUploadSuccess, onUploadError) {

        this._super(UIButton, 'init',
            [
                game.data.screenWidth / 4 * 3 - 128,
                game.data.screenHeight / 2 - 128,
                {
                    imageName: "correct",
                    onclick: function() {
						ajax(
							"GET",
							game.data.apiUrl + "?m=post&game_id=" + game.data.gameId
							+ "&user_id=" + game.data.playerId
							+ "&score=" + game.data.score,
							onUploadSuccess,
							onUploadError
						);
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

	disable: function() {
        me.input.releasePointerEvent("pointerup", this.collider);
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

		this.hiScore = 0;


		// get game score from cookie
		var games = deserializeGameInfo($.cookie("games"));
	
		// update score
		if (games[game.data.gameId] === undefined 
			|| games[game.data.gameId] < game.data.score) {
			games[game.data.gameId] = game.data.score;
		}
			
		// write back to cookie
		$.cookie("games", serializeGameInfo(games), { expires: 1, path: '/' });
	
		// get high score
		this.hiScore = games[game.data.gameId];

		
		// calculate rank from score
		this.calcRank();

		// Debug
		//for (var i = 0; i <= game.data.maxScore; i += 100) {
		//	game.data.score = i;
		//	this.calcRank();
		//}

		// Messages
		this.messages = [];
		this.messages[0] = new UILabel(
            game.data.screenWidth / 2,
            game.data.screenHeight / 2 - 256 - 128,
			{
				textAlign: "center",
				size: 48,
				text: "本次得分"
			}
		);
		this.messages[1] = new UILabel(
            game.data.screenWidth / 2,
            game.data.screenHeight / 2 - 256 - 128 + 48 + 16,
			{
				textAlign: "center",
				size: 128,
				text: game.data.score || "0"
			}
		);
		this.messages[2] = new UILabel(
            game.data.screenWidth / 2,
            game.data.screenHeight / 2 - 256 - 128 + 48 + 128 + 32,
			{
				textAlign: "center",
				size: 48,
				text: "个人最佳：" + this.hiScore
			}
		);


		this.messages[3] = new UILabel(
            game.data.screenWidth / 2,
            game.data.screenHeight / 2 - 256 - 128 + 128 + 96 + 64,
			{
				textAlign: "center",
				size: 48,
				text: "总分排名：" + this.rank + "\n\n超越了全球" + this.rate + "%的用户"
			}
		);

		// add all messages
		this.messages.map(function(message) {
			me.game.world.addChild(message, 101);
		});


        this.retry = new Retry();
        me.game.world.addChild(this.retry, 100);
      
		this.returnToIndex = new ReturnToIndex();
        me.game.world.addChild(this.returnToIndex, 100);
    },

	calcRank: function() {
		if (game.data.score === undefined || game.data.score == 0) {
			this.rate = 0;
			this.rank = game.data.totalRank;
		} else if (game.data.score >= game.data.maxScore) {
			this.rate = 100;
			this.rank = 1;
		} else {
			// mean = 3/7 stddev = 1/7
			var mean = game.data.maxScore * 3 / 7;
			var stddev = game.data.maxScore / 4;
		
			// generate gaussian distribution and get z-rate
			var distribution = new Gaussian(mean, stddev * stddev);
			var zRate = distribution.cdf(game.data.score);

			// calculate rand and rank according to user score
			this.rate = Math.round(zRate * 100);
			this.rank = Math.round(game.data.totalRank - game.data.totalRank * zRate);
		}
		//console.log("Score: " + game.data.score + " zRate: " + zRate + " rate: " + this.rate + " rank: " + this.rank);
	},

    onDestroyEvent: function() {
		this.messages.map(function(message) {
        	me.game.world.removeChild(message);
		});
        me.game.world.removeChild(this.retry);
        me.game.world.removeChild(this.returnToIndex);

        this.retry = null;
		this.returnToIndex = null;
		this.message = [];
    }
});
